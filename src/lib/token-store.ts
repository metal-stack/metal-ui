const TOKENS_KEY = "metal-ui.tokens";

export type TokenEntry = {
  id: string;
  name: string;
  token: string;
  apiUrl: string;
};

export type TokenStore = {
  tokens: TokenEntry[];
  activeId: string | null;
};

export function getTokenStore(): TokenStore {
  const raw = localStorage.getItem(TOKENS_KEY);
  if (!raw) return { tokens: [], activeId: null };
  try {
    return JSON.parse(raw);
  } catch {
    return { tokens: [], activeId: null };
  }
}

export function saveTokenStore(store: TokenStore): void {
  localStorage.setItem(TOKENS_KEY, JSON.stringify(store));
}

export function addTokenToStore(
  name: string,
  token: string,
  apiUrl: string,
): { token: TokenEntry; store: TokenStore } {
  const store = getTokenStore();
  let finalName = name;
  let counter = 1;
  while (store.tokens.some((t) => t.name === finalName)) {
    finalName = `${name} ${counter}`;
    counter++;
  }
  const newToken: TokenEntry = {
    id: crypto.randomUUID(),
    name: finalName,
    token,
    apiUrl,
  };
  store.tokens = [...store.tokens, newToken];
  store.activeId = newToken.id;
  saveTokenStore(store);
  return { token: newToken, store };
}

export function removeTokenFromStore(id: string): {
  store: TokenStore;
  didSwitch: boolean;
} {
  const store = getTokenStore();
  const wasActive = store.activeId === id;
  const filtered = store.tokens.filter((t) => t.id !== id);

  let didSwitch = false;
  if (wasActive) {
    didSwitch = true;
    if (filtered.length > 0) {
      store.activeId = filtered[0].id;
    } else {
      store.activeId = null;
    }
  }

  store.tokens = filtered;
  saveTokenStore(store);
  return { store, didSwitch };
}

export function switchTokenInStore(id: string): TokenStore {
  const store = getTokenStore();
  const exists = store.tokens.some((t) => t.id === id);
  if (exists) {
    store.activeId = id;
    saveTokenStore(store);
  }
  return store;
}

export function getActiveToken(): TokenEntry | null {
  const store = getTokenStore();
  if (!store.activeId) return null;
  return store.tokens.find((t) => t.id === store.activeId) ?? null;
}

export function getAllTokens(): TokenEntry[] {
  const store = getTokenStore();
  return store.tokens;
}
