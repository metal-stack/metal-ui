import { Select, Stack } from "@mantine/core";
import { useProject } from "@/providers/ProjectProvider";
import { useTenant } from "@/providers/TenantProvider";
import { TokenSelector } from "./token-selector";

export function NavCtx() {
  const projectCtx = useProject();
  const tenantCtx = useTenant();
  return (
    <Stack gap="xs">
      <TokenSelector />
      <Select
        label="Tenant"
        size="xs"
        allowDeselect={false}
        value={tenantCtx.currentTenant.login}
        data={tenantCtx.tenants.map((t) => ({
          value: t.login,
          label: t.name,
        }))}
        onChange={(value) => {
          const tenant = tenantCtx.tenants.find((t) => t.login === value);
          if (tenant) tenantCtx.setCurrentTenant(tenant);
        }}
      />
      <Select
        label="Project"
        size="xs"
        allowDeselect={false}
        value={projectCtx.currentProject?.uuid ?? null}
        data={projectCtx.projects.map((p) => ({
          value: p.uuid,
          label: p.name,
        }))}
        onChange={(value) => {
          const project = projectCtx.projects.find((p) => p.uuid === value);
          if (project) projectCtx.setCurrentProject(project);
        }}
      />
    </Stack>
  );
}
