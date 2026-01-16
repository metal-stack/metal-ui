import { MethodsProvider } from "@/providers/MethodsProvider";
import { ProjectProvider } from "@/providers/ProjectProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { TenantProvider } from "@/providers/TenantProvider";
import { UserProvider } from "@/providers/UserProvider";
import { Outlet } from "react-router";

export function QueryLayout() {
  return (
    <QueryProvider>
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
