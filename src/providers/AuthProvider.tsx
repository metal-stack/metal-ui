import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  TokenEntry,
  getActiveToken,
  addTokenToStore,
  removeTokenFromStore,
  switchTokenInStore,
  getAllTokens,
  clearTokenStore,
} from "@/lib/token-store";
import { toast } from "sonner";

type AuthState =
  | { status: "loading"; apiToken: null; apiUrl: null; allTokens: TokenEntry[] }
  | {
      status: "unauthenticated";
      apiToken: null;
      apiUrl: null;
      allTokens: TokenEntry[];
    }
  | {
      status: "authenticated";
      apiToken: string;
      apiUrl: string;
      allTokens: TokenEntry[];
    };

type AuthContextValue = AuthState & {
  reload: () => void;
  logout: () => void;
  addToken: (name: string, token: string, apiUrl: string) => void;
  removeToken: (id: string) => void;
  switchToken: (id: string) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    status: "loading",
    apiToken: null,
    apiUrl: null,
    allTokens: [],
  });

  const loadState = useCallback(() => {
    const active = getActiveToken();
    if (active) {
      setState({
        status: "authenticated",
        apiToken: active.token,
        apiUrl: active.apiUrl,
        allTokens: getAllTokens(),
      });
    } else {
      setState({
        status: "unauthenticated",
        apiToken: null,
        apiUrl: null,
        allTokens: [],
      });
    }
  }, []);

  useEffect(() => {
    loadState();
  }, [loadState]);

  const reload = loadState;

  const addToken = useCallback(
    (name: string, token: string, apiUrl: string) => {
      const result = addTokenToStore(name, token, apiUrl);
      const store = result.store;
      const active = store.tokens.find((t) => t.id === store.activeId);
      if (active) {
        setState({
          status: "authenticated",
          apiToken: active.token,
          apiUrl: active.apiUrl,
          allTokens: store.tokens,
        });
      }
    },
    [],
  );

  const removeToken = useCallback((id: string) => {
    const result = removeTokenFromStore(id);
    const { store, didSwitch } = result;
    if (didSwitch) {
      const active = store.activeId
        ? store.tokens.find((t) => t.id === store.activeId)
        : null;
      if (active) {
        setState({
          status: "authenticated",
          apiToken: active.token,
          apiUrl: active.apiUrl,
          allTokens: store.tokens,
        });
      } else {
        setState({
          status: "unauthenticated",
          apiToken: null,
          apiUrl: null,
          allTokens: [],
        });
      }
    } else {
      setState((prev) => {
        if (prev.status !== "authenticated") return prev;
        return { ...prev, allTokens: store.tokens };
      });
    }
  }, []);

  const switchToken = useCallback((id: string) => {
    const store = switchTokenInStore(id);
    const active = store.tokens.find((t) => t.id === store.activeId);
    if (active) {
      setState({
        status: "authenticated",
        apiToken: active.token,
        apiUrl: active.apiUrl,
        allTokens: store.tokens,
      });
    } else {
      setState({
        status: "unauthenticated",
        apiToken: null,
        apiUrl: null,
        allTokens: [],
      });
    }
  }, []);

  const logout = useCallback(() => {
    clearTokenStore();
    setState({
      status: "unauthenticated",
      apiToken: null,
      apiUrl: null,
      allTokens: [],
    });
    toast.success("Auth", {
      id: "logged-out",
      richColors: true,
      description: "Logged out successfully.",
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, reload, logout, addToken, removeToken, switchToken }),
    [state, reload, logout, addToken, removeToken, switchToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function useAuthenticatedAuth() {
  const auth = useAuth();
  if (auth.status !== "authenticated")
    throw new Error("useAuthenticatedAuth must be used when authenticated");
  return auth;
}
