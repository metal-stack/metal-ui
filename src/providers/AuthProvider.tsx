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
    }
  | {
      status: "authenticated";
      apiUrl: string;
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
    const current = mapped.contexts.find(
      (c) => c.name === mapped.currentContext,
    );

    if (!current) return { status: "unauthenticated", reason: "no-context" };
    if (!current.apiToken)
      return { status: "unauthenticated", reason: "no-token" };

    console.log("Authenticated with context:", current.name);

    return {
      status: "authenticated",
      apiUrl: current.apiUrl,
      contexts: mapped.contexts,
      currentContext: current,
    };
  };

  const reload = useCallback(async () => {
    const seq = ++reloadSeq.current;
    try {
      const config = await loadCliConfig();
      const next = computeStateFromConfig(config);
      if (seq === reloadSeq.current) setState(next);
    } catch (error) {
      if (seq === reloadSeq.current)
        setState({ status: "unauthenticated", reason: "no-config" });

      toast.error("Auth", {
        id: "auth-load-config-failed",
        richColors: true,
        description: `Failed to load config: ${String(error)}`,
      });
    }
  }, []);

  const logout = useCallback(() => {
    console.log("Logging out");
    setState({ status: "unauthenticated" });
    toast.info("Auth", {
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
    // TODO: set context in cli config file, and then reload and not just set state
    // await setCliCurrentContext(ctx.name); await reload();

    setState((prev) => {
      if (prev.status !== "authenticated") return prev;
      return { ...prev, currentContext: ctx, apiUrl: ctx.apiUrl };
    });
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return { ...state, reload, logout, setCurrentContext };
  }, [state, reload, logout, setCurrentContext]);

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
