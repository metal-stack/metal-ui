import {
  ActionIcon,
  Anchor,
  AppShell,
  Breadcrumbs,
  Button,
  Group,
  Popover,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconHeartRateMonitor,
  IconLayoutSidebar,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { useQuery } from "@connectrpc/connect-query";
import { HealthService } from "@metal-stack/api/js/metalstack/api/v2/health_pb";
import ServiceHealthItem from "@/components/health/service-health-item";
import { Link, useLocation } from "react-router";

interface SiteHeaderProps {
  mobileOpened: boolean;
  desktopOpened: boolean;
  toggleMobile: () => void;
  toggleDesktop: () => void;
}

const labels: Record<string, string> = {
  ips: "IPs",
  admin: "Admin",
};

function labelFor(segment: string) {
  const decoded = decodeURIComponent(segment);
  return labels[decoded] ?? decoded.charAt(0).toUpperCase() + decoded.slice(1);
}

function PageBreadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [{ label: "Dashboard", to: "/" }].concat(
    segments.map((segment, i) => ({
      label: labelFor(segment),
      to: "/" + segments.slice(0, i + 1).join("/"),
    })),
  );
  // "/admin" itself has no page, so it is shown as plain text
  return (
    <Breadcrumbs separator="›" separatorMargin="xs">
      {crumbs.map((crumb, i) =>
        i === crumbs.length - 1 ? (
          <Text key={crumb.to} size="sm" fw={500}>
            {crumb.label}
          </Text>
        ) : crumb.to === "/admin" ? (
          <Text key={crumb.to} size="sm" c="dimmed">
            {crumb.label}
          </Text>
        ) : (
          <Anchor
            key={crumb.to}
            component={Link}
            to={crumb.to}
            size="sm"
            c="dimmed"
          >
            {crumb.label}
          </Anchor>
        ),
      )}
    </Breadcrumbs>
  );
}

export function SiteHeader({
  mobileOpened,
  desktopOpened,
  toggleMobile,
  toggleDesktop,
}: SiteHeaderProps) {
  const { data } = useQuery(HealthService.method.get);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between" wrap="nowrap">
        <Group wrap="nowrap" gap="sm">
          <ActionIcon
            variant="subtle"
            color="gray"
            hiddenFrom="sm"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpened}
            onClick={toggleMobile}
          >
            <IconLayoutSidebar size={20} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="gray"
            visibleFrom="sm"
            aria-label="Toggle navigation"
            aria-expanded={desktopOpened}
            onClick={toggleDesktop}
          >
            <IconLayoutSidebar size={20} />
          </ActionIcon>
          <PageBreadcrumbs />
        </Group>
        <Group gap="xs" wrap="nowrap">
          <Button
            component="a"
            href="https://metal-stack.io/docs/home/"
            target="_blank"
            rel="noopener noreferrer"
            variant="default"
            h={34}
            visibleFrom="sm"
          >
            Docs
          </Button>
          <Popover position="bottom-end" withArrow>
            <Popover.Target>
              <ActionIcon
                variant="default"
                size="lg"
                aria-label="Service health"
              >
                <IconHeartRateMonitor size={18} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              {data?.health?.services.map((service) => (
                <ServiceHealthItem
                  key={service.name}
                  serviceName={service.name}
                  status={service.status}
                  message={service.message}
                />
              ))}
            </Popover.Dropdown>
          </Popover>
          <ActionIcon
            variant="default"
            size="lg"
            aria-label="Toggle color scheme"
            onClick={() => toggleColorScheme()}
          >
            {colorScheme === "dark" ? (
              <IconMoon size={18} />
            ) : (
              <IconSun size={18} />
            )}
          </ActionIcon>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
