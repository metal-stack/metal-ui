// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::path::{Path, PathBuf};
use std::{fs, io};
use tauri::Emitter;
use tauri_plugin_opener::OpenerExt;
use tokio::sync::oneshot;

use serde::{Deserialize, Serialize};

#[derive(Default, Debug, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub struct Contexts {
    pub contexts: Vec<Context>,
    pub current_context: String,
    pub previous_context: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Context {
    pub name: String,

    #[serde(rename = "api-token")]
    pub api_token: String,

    #[serde(rename = "api-url")]
    pub api_url: String,

    #[serde(rename = "default-project")]
    pub default_project: String,

    pub provider: String,
}

impl Contexts {
    fn get_mut(&mut self, name: &str) -> Option<&mut Context> {
        self.contexts.iter_mut().find(|c| c.name == name)
    }
    fn get(&self, name: &str) -> Option<&Context> {
        self.contexts.iter().find(|c| c.name == name)
    }
}

#[tauri::command]
fn read_cli_config() -> Result<Contexts, String> {
    let home = dirs::home_dir().ok_or("no home dir found")?;
    let path = home.join(".metal-stack").join("config.yaml");

    let content =
        std::fs::read_to_string(&path).map_err(|e| format!("failed to read config: {}", e))?;

    let config: Contexts =
        serde_yaml::from_str(&content).map_err(|e| format!("invalid yaml: {}", e))?;

    Ok(config)
}

#[tauri::command]
async fn start_oauth_login(
    app: tauri::AppHandle,
    api_url: String,
    provider: String,
    context_name: Option<String>,
) -> Result<(), String> {
    let listener = std::net::TcpListener::bind("127.0.0.1:0").map_err(|e| e.to_string())?;
    listener.set_nonblocking(true).map_err(|e| e.to_string())?;

    let port = listener.local_addr().map_err(|e| e.to_string())?.port();
    let redirect_url = format!("http://127.0.0.1:{port}/callback");

    let oauth_url = format!(
        "{}/auth/{}?redirect-url={}",
        api_url.trim_end_matches('/'),
        provider,
        urlencoding::encode(&redirect_url),
    );

    app.opener()
        .open_url(oauth_url, None::<&str>)
        .map_err(|e| e.to_string())?;

    let (tx, rx) = oneshot::channel::<String>();
    let app2 = app.clone();

    tauri::async_runtime::spawn(async move {
        let token = handle_callback_once(listener, app2).await;
        let _ = tx.send(token);
    });

    let token = rx
        .await
        .map_err(|_| "callback task ended unexpectedly".to_string())?;
    if token.is_empty() {
        return Err("no token was retrieved".to_string());
    }

    // optional emit event to frontend
    app.emit("oauth-token", token.clone()).ok();

    // update config file and the reload
    update_config_after_login(&api_url, &provider, context_name.as_deref(), &token).await?;

    Ok(())
}

async fn handle_callback_once(listener: std::net::TcpListener, app: tauri::AppHandle) -> String {
    use std::io::{Read, Write};

    // primitive poll loop for nonblocking listener
    loop {
        match listener.accept() {
            Ok((mut stream, _addr)) => {
                let mut buffer = [0u8; 8192];
                let _ = stream.read(&mut buffer);
                let request = String::from_utf8_lossy(&buffer);

                let token = extract_token_from_http_request(&request).unwrap_or_default();
                if !token.is_empty() {
                    app.emit("oauth-token", token.clone()).ok();
                }

                let response = "HTTP/1.1 302 Found\r\nLocation: https://metal-stack.io\r\nContent-Length: 0\r\n\r\n";
                let _ = stream.write_all(response.as_bytes());
                return token;
            }
            Err(e) if e.kind() == std::io::ErrorKind::WouldBlock => {
                // short sleep to avoid busy waiting
                // tokio::time::sleep(std::time::Duration::from_millis(25)).await;
                continue;
            }
            Err(_) => return String::new(),
        }
    }
}

fn extract_token_from_http_request(req: &str) -> Option<String> {
    let first_line = req.lines().next()?;
    let mut parts = first_line.split_whitespace();
    let _method = parts.next()?;
    let path_q = parts.next()?;
    let url = url::Url::parse(&format!("http://localhost{}", path_q)).ok()?;

    url.query_pairs()
        .find(|(k, _)| k == "token")
        .map(|(_, v)| v.to_string())
}

fn config_path() -> Result<PathBuf, String> {
    let home = dirs::home_dir().ok_or("no home dir found")?;
    Ok(home.join(".metal-stack").join("config.yaml"))
}

fn ensure_default_dir(path: &Path) -> Result<(), String> {
    let dir = path.parent().ok_or("no parent dir")?;
    fs::create_dir_all(dir).map_err(|e| format!("unable to ensure config dir: {e}"))?;

    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        fs::set_permissions(dir, fs::Permissions::from_mode(0o700))
            .map_err(|e| format!("unable to set dir permissions: {e}"))?;
    }
    Ok(())
}

fn read_contexts_or_default(path: &Path) -> Result<Contexts, String> {
    match fs::read_to_string(path) {
        Ok(content) => serde_yaml::from_str(&content).map_err(|e| format!("invalid yaml: {e}")),
        Err(e) if e.kind() == io::ErrorKind::NotFound => Ok(Contexts::default()),
        Err(e) => Err(format!("failed to read config: {e}")),
    }
}

fn atomic_write_yaml_0600(path: &Path, yaml: &str) -> Result<(), String> {
    use std::time::{SystemTime, UNIX_EPOCH};

    let dir = path.parent().ok_or("no parent dir")?;
    let nonce = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_nanos();
    let tmp = dir.join(format!(".config.yaml.tmp.{nonce}"));

    fs::write(&tmp, yaml).map_err(|e| format!("write temp failed: {e}"))?;

    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        fs::set_permissions(&tmp, fs::Permissions::from_mode(0o600))
            .map_err(|e| format!("unable to set file permissions: {e}"))?;
    }

    fs::rename(&tmp, path).map_err(|e| format!("rename failed: {e}"))?;
    Ok(())
}

fn write_contexts(ctxs: &Contexts) -> Result<(), String> {
    let path = config_path()?;
    ensure_default_dir(&path)?;

    let raw = serde_yaml::to_string(ctxs).map_err(|e| format!("yaml marshal failed: {e}"))?;
    atomic_write_yaml_0600(&path, &raw)?;
    Ok(())
}

async fn update_config_after_login(
    api_url: &str,
    provider: &str,
    context_name: Option<&str>,
    token: &str,
) -> Result<(), String> {
    let path = config_path()?;
    let mut ctxs = read_contexts_or_default(&path)?;

    let ctx_name = context_name
        .unwrap_or_else(|| {
            if !ctxs.current_context.is_empty() {
                ctxs.current_context.as_str()
            } else {
                "default"
            }
        })
        .to_string();

    // create context if not exists
    if ctxs.get(&ctx_name).is_none() {
        ctxs.contexts.push(Context {
            name: ctx_name.clone(),
            api_url: api_url.to_string(),
            provider: provider.to_string(),
            api_token: String::new(),
            default_project: String::new(),
        });
    }

    // set provider and switch switch
    {
        let ctx = ctxs
            .get_mut(&ctx_name)
            .ok_or("context not found after insert")?;
        ctx.provider = provider.to_string();
        if ctx.api_url.is_empty() {
            ctx.api_url = api_url.to_string();
        }
        ctx.api_token = token.to_string();
    }

    ctxs.previous_context = ctxs.current_context.clone();
    ctxs.current_context = ctx_name.clone();

    //TODO set default project if empty

    write_contexts(&ctxs)?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![start_oauth_login, read_cli_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
