import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Group,
  Popover,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconHeartRateMonitor,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { useQuery } from "@connectrpc/connect-query";
import { HealthService } from "@metal-stack/api/js/metalstack/api/v2/health_pb";
import ServiceHealthItem from "@/components/health/service-health-item";
import { useLocation, useNavigate } from "react-router";

interface SiteHeaderProps {
  title: string;
  mobileOpened: boolean;
  desktopOpened: boolean;
  toggleMobile: () => void;
  toggleDesktop: () => void;
}

export function SiteHeader({
  title,
  mobileOpened,
  desktopOpened,
  toggleMobile,
  toggleDesktop,
}: SiteHeaderProps) {
  const { data } = useQuery(HealthService.method.get);
  const navigate = useNavigate();
  const location = useLocation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  let backPath = "/";
  if (location.pathname !== "/") {
    backPath = location.pathname.split("/").slice(0, -1).join("/");
    if (backPath === "/admin") {
      backPath = "/";
    }
  }

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between" wrap="nowrap">
        <Group wrap="nowrap">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
            aria-label="Toggle navigation"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
            aria-label="Toggle navigation"
          />
          {location.pathname !== "/" && (
            <ActionIcon
              variant="subtle"
              color="gray"
              aria-label="Back"
              onClick={() => navigate(backPath)}
            >
              <IconArrowLeft size={18} />
            </ActionIcon>
          )}
          <Title order={1} size="h4">
            {title}
          </Title>
        </Group>
        <Group gap="xs" wrap="nowrap">
          <Button
            component="a"
            href="https://metal-stack.io/docs/home/"
            target="_blank"
            rel="noopener noreferrer"
            variant="light"
            size="xs"
            visibleFrom="sm"
          >
            Docs
          </Button>
          <Popover position="bottom-end" withArrow>
            <Popover.Target>
              <ActionIcon variant="default" size="lg" aria-label="Service health">
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
