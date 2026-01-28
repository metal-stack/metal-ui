import { Navigate, Outlet, useLocation, useMatches } from "react-router";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

import { useMethods } from "@/providers/MethodsProvider";

export function PermissionLayout() {
  const matches = useMatches();
  const location = useLocation();
  const { isAllowed } = useMethods();

  const permissionEntries = useMemo(() => {
    return matches
      .map((m) => m.handle as any)
      .filter(Boolean)
      .filter((h) => h.permission)
      .map((h) => ({
        requires: h.permission as string | string[],
        any: h.permissionAny ?? true,
      }));
  }, [matches]);

  const allowed = useMemo(() => {
    if (permissionEntries.length === 0) return true;
    return permissionEntries.every(({ requires, any }) =>
      isAllowed(requires, { any }),
    );
  }, [permissionEntries, isAllowed]);

  useEffect(() => {
    if (!allowed)
      toast.warning("Permssions", {
        id: "permission-denied",
        richColors: true,
        description:
          "You do not have the required permissions to access this page.",
      });
  }, [allowed]);

  if (!allowed) return <Navigate to="/" replace state={{ from: location }} />;

  return <Outlet />;
}
