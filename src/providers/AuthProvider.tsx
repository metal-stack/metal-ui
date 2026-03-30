import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  loadCliConfig,
  mapCliConfig,
  CliConfig,
  CliContext,
} from "@/lib/cli-config";
import { toast } from "sonner";
import { listen } from "@tauri-apps/api/event";

type AuthState =
  | { status: "loading" }
  | {
      status: "unauthenticated";
      reason?: "no-config" | "no-context" | "no-token";
      contexts: CliContext[];
      currentContext?: CliContext;
    }
  | {
      status: "authenticated";
      contexts: CliContext[];
      currentContext: CliContext;
    };

type AuthContextValue = AuthState & {
  reload: () => Promise<void>;
  logout: () => void;
  setCurrentContext: (ctx: CliContext) => Promise<void> | void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  // To avoid race conditions
  const reloadSeq = useRef(0);

  const computeStateFromConfig = (config: CliConfig): AuthState => {
    const mapped = mapCliConfig(config);

    const selected =
      mapped.contexts.find((c) => c.name === mapped.currentContext) ??
      mapped.contexts[0];

    if (!selected) {
      return { status: "unauthenticated", reason: "no-context", contexts: [] };
    }

    if (!selected.apiToken) {
      return {
        status: "unauthenticated",
        reason: "no-token",
        contexts: mapped.contexts,
        currentContext: selected,
      };
    }

    return {
      status: "authenticated",
      contexts: mapped.contexts,
      currentContext: selected,
    };
  };

  const reload = useCallback(async () => {
    const seq = ++reloadSeq.current;
    try {
      const config = await loadCliConfig();
      const next = computeStateFromConfig(config);
      if (seq === reloadSeq.current) setState(next);
      console.log("config-state");
      //TODO error here when can set currentCtx
      console.log(next);
    } catch (error) {
      if (seq === reloadSeq.current)
        setState({
          status: "unauthenticated",
          reason: "no-config",
          contexts: [],
        });

      toast.error("Auth", {
        id: "auth-load-config-failed",
        richColors: true,
        description: `Failed to load config: ${String(error)}`,
      });
    }
  }, []);

  const logout = useCallback(() => {
    setState((prev) => {
      if (prev.status === "authenticated") {
        return {
          status: "unauthenticated",
          reason: "no-token",
          contexts: prev.contexts,
          currentContext: prev.currentContext,
        };
      }
      return prev.status === "unauthenticated"
        ? prev
        : { status: "unauthenticated", contexts: [], reason: "no-token" };
    });

    toast.success("Auth", {
      id: "logged-out",
      richColors: true,
      description: "Logged out successfully.",
    });
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    let mounted = true;

    const p = listen("oauth-token", async () => {
      toast.success("Auth", {
        id: "oauth-token-received",
        richColors: true,
        description: "OAuth login finished. Reloading config…",
      });
      await reload();
    });

    return () => {
      mounted = false;
      p.then((unlisten) => mounted && unlisten()).catch(() => {});
    };
  }, [reload]);

  const setCurrentContext = useCallback(async (ctx: CliContext) => {
    // ideal: persistieren, damit reload() das auch wieder sieht
    // await invoke("set_current_context", { name: ctx.name });
    // await reload();

    setState((prev) => {
      if (prev.status === "authenticated") {
        return { ...prev, currentContext: ctx };
      }
      if (prev.status === "unauthenticated") {
        // assume autenticated when switching context -> will redirect to login if not and logout
        return { ...prev, status: "authenticated", currentContext: ctx };
      }
      return prev;
    });
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return { ...state, reload, logout, setCurrentContext };
  }, [state, reload, logout, setCurrentContext]);

  console.log("auth");
  console.log(state);

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
