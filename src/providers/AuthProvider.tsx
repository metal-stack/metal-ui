import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loadAuth, clearAuth } from "@/lib/auth-storage";
import { toast } from "sonner";

type AuthState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "authenticated"; apiToken: string; apiUrl: string };

type AuthContextValue = AuthState & {
  reload: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  const reload = useCallback(() => {
    const stored = loadAuth();
    if (stored) {
      setState({ status: "authenticated", apiToken: stored.apiToken, apiUrl: stored.apiUrl });
    } else {
      setState({ status: "unauthenticated" });
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const logout = useCallback(() => {
    clearAuth();
    setState({ status: "unauthenticated" });
    toast.success("Auth", {
      id: "logged-out",
      richColors: true,
      description: "Logged out successfully.",
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, reload, logout }),
    [state, reload, logout],
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
