import { Navigate, Outlet, useLocation } from "react-router";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import { useAuth } from "@/providers/AuthProvider";

export function ProtectedRoute() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.status === "loading") return <LoadingScreen />;

  if (auth.status !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
