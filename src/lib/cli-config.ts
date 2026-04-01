import { invoke } from "@tauri-apps/api/core";

export type CliContext = {
  name: string;
  apiToken: string;
  apiUrl: string;
  defaultProject: string;
  provider: string;
};

export type CliConfig = {
  contexts: CliContext[];
  currentContext?: string;
  previousContext?: string;
};

export async function loadCliConfig(): Promise<CliConfig> {
  return invoke("read_cli_config");
}

export function mapCliConfig(config: any): CliConfig {
  return {
    contexts: config.contexts.map((c: any) => ({ name: c.name, apiToken: c["api-token"], apiUrl: c["api-url"], defaultProject: c["default-project"], provider: c.provider })),
    currentContext: config["current-context"],
    previousContext: config["previous-context"],
  };
}
