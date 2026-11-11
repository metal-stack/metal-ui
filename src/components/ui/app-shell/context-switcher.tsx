import {
  Divider,
  Group,
  Popover,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import {
  IconCheck,
  IconKey,
  IconSearch,
  IconSelector,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { useProject } from "@/providers/ProjectProvider";
import { useTenant } from "@/providers/TenantProvider";
import { TokenList, useMultiToken } from "./token-selector";

export function ContextSwitcher() {
  const { currentProject, projects, setCurrentProject } = useProject();
  const { currentTenant, tenants, setCurrentTenant } = useTenant();
  const { allTokens, activeTokenId } = useMultiToken();
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");

  const tenantName = (login: string) =>
    tenants.find((t) => t.login === login)?.name ?? login;

  // The project determines the tenant: keep both in sync.
  useEffect(() => {
    if (!currentProject || currentProject.tenant === currentTenant.login)
      return;
    const tenant = tenants.find((t) => t.login === currentProject.tenant);
    if (tenant) setCurrentTenant(tenant);
  }, [currentProject, currentTenant, tenants, setCurrentTenant]);

  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    const byTenant = new Map<string, typeof projects>();
    for (const p of projects) {
      const hit =
        !q ||
        p.name.toLowerCase().includes(q) ||
        tenantName(p.tenant).toLowerCase().includes(q);
      if (!hit) continue;
      byTenant.set(p.tenant, [...(byTenant.get(p.tenant) ?? []), p]);
    }
    return [...byTenant.entries()];
  }, [projects, tenants, search]);

  const tokenName =
    allTokens.find((t) => t.id === activeTokenId)?.name ?? "No token";

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      width={280}
      position="bottom-start"
      shadow="md"
    >
      <Popover.Target>
        <UnstyledButton
          w="100%"
          px="sm"
          py={6}
          onClick={() => setOpened((o) => !o)}
          style={{
            border: "1px solid var(--mantine-color-default-border)",
            borderRadius: "var(--mantine-radius-sm)",
          }}
        >
          <Group justify="space-between" wrap="nowrap">
            <Stack gap={0} miw={0}>
              <Text size="sm" fw={500} truncate>
                {tenantName(currentTenant.login)}
                {currentProject ? ` / ${currentProject.name}` : ""}
              </Text>
              <Group gap={4} wrap="nowrap">
                <IconKey size={12} />
                <Text size="xs" c="dimmed" truncate>
                  {tokenName}
                </Text>
              </Group>
            </Stack>
            <IconSelector size={16} />
          </Group>
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown p="xs">
        <TextInput
          size="xs"
          placeholder="Search projects…"
          leftSection={<IconSearch size={14} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          data-autofocus
        />
        <ScrollArea.Autosize mah={280} mt="xs">
          {groups.length === 0 && (
            <Text size="xs" c="dimmed" p="xs">
              No projects found
            </Text>
          )}
          {groups.map(([tenant, items]) => (
            <Stack key={tenant} gap={2} mb="xs">
              <Text size="xs" fw={600} c="dimmed" px="xs" tt="uppercase">
                {tenantName(tenant)}
              </Text>
              {items.map((p) => {
                const active = p.uuid === currentProject?.uuid;
                return (
                  <UnstyledButton
                    key={p.uuid}
                    px="xs"
                    py={6}
                    bg={
                      active ? "var(--mantine-color-default-hover)" : undefined
                    }
                    style={{ borderRadius: "var(--mantine-radius-sm)" }}
                    onClick={() => {
                      const t = tenants.find((x) => x.login === p.tenant);
                      if (t) setCurrentTenant(t);
                      setCurrentProject(p);
                      setOpened(false);
                      setSearch("");
                    }}
                  >
                    <Group justify="space-between" wrap="nowrap">
                      <Text size="sm" truncate>
                        {p.name}
                      </Text>
                      {active && <IconCheck size={14} />}
                    </Group>
                  </UnstyledButton>
                );
              })}
            </Stack>
          ))}
        </ScrollArea.Autosize>
        <Divider my="xs" label="Token" labelPosition="left" />
        <TokenList onSwitch={() => setOpened(false)} />
      </Popover.Dropdown>
    </Popover>
  );
}
