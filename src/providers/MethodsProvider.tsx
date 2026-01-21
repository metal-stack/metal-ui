import AlertHint from "@/components/ui/alert/AlertHint";
import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@connectrpc/connect-query";
import { MethodService } from "@metal-stack/api/js/metalstack/api/v2/method_pb";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import { useAuthenticatedAuth } from "./AuthProvider";
import { buildPermissionChecker } from "@/lib/permissions-checker";

type MethodsContextValue = {
  methodsPermissions: string[];
  isAllowed: (required: string | string[], opts?: { any?: boolean }) => boolean;
};

const MethodsContext = createContext<MethodsContextValue | undefined>(
  undefined
);

export function MethodsProvider({ children }: { children: React.ReactNode }) {
  const authenticatedAuth = useAuthenticatedAuth();

  const { data, isLoading, error } = useQuery(
    MethodService.method.list,
    undefined,
    { enabled: authenticatedAuth.isAuthenticated }
  );

  const isAllowed = useMemo(
    () => buildPermissionChecker(data?.methods ?? []),
    [data?.methods]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return (
      <AlertHint
        title="No methods available"
        description="You do not have permissions to access any methods."
      />
    );
  }

  return (
    <MethodsContext.Provider
      value={{
        methodsPermissions: data.methods,
        isAllowed,
      }}
    >
      {children}
    </MethodsContext.Provider>
  );
}

export function useMethods(): MethodsContextValue {
  const context = useContext(MethodsContext);

  if (!context) {
    throw new Error("useMethods must be used within a MethodsProvider");
  }

  return context;
}

export function useIsAllowed(
  required: string | string[],
  opts?: { any?: boolean }
) {
  const { isAllowed } = useMethods();
  return isAllowed(required, opts);
}

export function MethodsGate({
  requires,
  any = true,
  fallback = null,
  children,
}: React.PropsWithChildren<{
  requires: string | string[];
  any?: boolean;
  fallback?: React.ReactNode;
}>) {
  const allowed = useIsAllowed(requires, { any });
  return allowed ? <>{children}</> : <>{fallback}</>;
}
