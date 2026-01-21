import { Navigate, Outlet } from "react-router";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import { useAuth } from "@/providers/AuthProvider";

export function PublicOnlyRoute() {
  const auth = useAuth();

  if (auth.status === "loading") return <LoadingScreen />;

  if (auth.status === "authenticated") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
