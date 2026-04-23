import { MethodsProvider } from "@/providers/MethodsProvider";
import { ProjectProvider } from "@/providers/ProjectProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { TenantProvider } from "@/providers/TenantProvider";
import { UserProvider } from "@/providers/UserProvider";
import { Outlet } from "react-router";
import { useAuth } from "@/providers/AuthProvider";

export function QueryLayout() {
  const auth = useAuth();
  return (
    <QueryProvider key={auth.apiToken ?? "loading"}>
      <MethodsProvider>
        <UserProvider>
          <TenantProvider>
            <ProjectProvider>
              <Outlet />
            </ProjectProvider>
          </TenantProvider>
        </UserProvider>
      </MethodsProvider>
    </QueryProvider>
  );
}
