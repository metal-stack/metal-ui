const AUTH_KEY = "metal-ui.auth";

export function loadAuth(): { apiToken: string; apiUrl: string } | null {
  const raw = sessionStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveAuth(data: { apiToken: string; apiUrl: string }): void {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(data));
}

export function clearAuth(): void {
  sessionStorage.removeItem(AUTH_KEY);
}
