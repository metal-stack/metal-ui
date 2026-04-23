// Re-export token store helpers for backward compatibility
export type { TokenEntry } from "./token-store";
export {
  getTokenStore,
  saveTokenStore,
  addTokenToStore,
  removeTokenFromStore,
  switchTokenInStore,
  getActiveToken,
  getAllTokens,
} from "./token-store";

// Legacy single-token API — deprecated, kept for backward compat
// These still use sessionStorage but are not used by new multi-token flow
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
