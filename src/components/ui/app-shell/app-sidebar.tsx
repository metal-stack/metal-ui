import {
  Icon,
  IconBuilding,
  IconCloudPin,
  IconDashboard,
  IconDeviceSdCard,
  IconGlobe,
  IconKey,
  IconMaximize,
  IconNetwork,
  IconPackage,
  IconRocket,
  IconServer2,
  IconSparkles2,
  IconSwitch2,
  IconTopologyStarRing2,
} from "@tabler/icons-react";
import { NavSection } from "@/components/ui/app-shell/nav-section";
import { NavSecondary } from "@/components/ui/app-shell/nav-secondary";
import { NavUser } from "@/components/ui/app-shell/nav-user";
import { AppShell, Divider, Group, ScrollArea, Text } from "@mantine/core";
import logo from "@/assets/metal-stack.png";
import { NavCtx } from "./nav-ctx";
import { permissions } from "@/lib/permissions-util";

export interface NavItem {
  title: string;
  url: string;
  icon: Icon;
  requires?: {
    methods: string[];
    any?: boolean;
  };
}

const data: {
  navMain: NavItem[];
  navSecondary: NavItem[];
  api: NavItem[];
  admin: NavItem[];
} = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Topology",
      url: "/topology",
      icon: IconTopologyStarRing2,
    },
    {
      title: "AI assistant",
      url: "/chat",
      icon: IconSparkles2,
    },
  ],
  //TODO add some items here later
  navSecondary: [],
  api: [
    {
      title: "Tenants",
      url: "/tenants",
      icon: IconBuilding,
      requires: {
        methods: permissions.API.tenants,
        any: false,
      },
    },
    {
      title: "Projects",
      url: "/projects",
      icon: IconRocket,
      requires: {
        methods: permissions.API.projects,
        any: false,
      },
    },
    {
      title: "Partitions",
      url: "/partitions",
      icon: IconCloudPin,
      requires: {
        methods: permissions.API.partitions,
        any: false,
      },
    },
    {
      title: "Machines",
      url: "/machines",
      icon: IconServer2,
      requires: {
        methods: permissions.API.machines,
        any: false,
      },
    },
    {
      title: "Sizes",
      url: "/sizes",
      icon: IconMaximize,
      requires: {
        methods: permissions.API.sizes,
        any: false,
      },
    },
    {
      title: "Images",
      url: "/images",
      icon: IconPackage,
      requires: {
        methods: permissions.API.images,
        any: false,
      },
    },
    {
      title: "IPs",
      url: "/ips",
      icon: IconGlobe,
      requires: {
        methods: permissions.API.ips,
        any: false,
      },
    },
    {
      title: "Networks",
      url: "/networks",
      icon: IconNetwork,
      requires: {
        methods: permissions.API.networks,
        any: false,
      },
    },
    {
      title: "Filesystems",
      url: "/filesystems",
      icon: IconDeviceSdCard,
      requires: {
        methods: permissions.API.filesystems,
        any: false,
      },
    },
    {
      title: "Tokens",
      url: "/tokens",
      icon: IconKey,
      requires: {
        methods: permissions.API.tokens,
        any: false,
      },
    },
  ],
  admin: [
    {
      title: "Tenants",
      url: "/admin/tenants",
      icon: IconBuilding,
      requires: {
        methods: permissions.ADMIN.tenants,
        any: false,
      },
    },
    {
      title: "Projects",
      url: "/admin/projects",
      icon: IconRocket,
      requires: {
        methods: permissions.ADMIN.projects,
        any: false,
      },
    },
    {
      title: "Machines",
      url: "/admin/machines",
      icon: IconServer2,
      requires: {
        methods: permissions.ADMIN.machines,
        any: false,
      },
    },
    {
      title: "IPs",
      url: "/admin/ips",
      icon: IconGlobe,
      requires: {
        methods: permissions.ADMIN.ips,
        any: false,
      },
    },
    {
      title: "Networks",
      url: "/admin/networks",
      icon: IconNetwork,
      requires: {
        methods: permissions.ADMIN.networks,
        any: false,
      },
    },
    {
      title: "Switches",
      url: "/admin/switches",
      icon: IconSwitch2,
      requires: {
        methods: permissions.ADMIN.switches,
        any: false,
      },
    },
  ],
};

export function AppSidebar() {
  return (
    <>
      <AppShell.Section p="md">
        <Group gap="xs">
          <img src={logo} alt="metal-stack" width={20} height={20} />
          <Text fw={600}>metal-stack.io</Text>
        </Group>
      </AppShell.Section>
      <AppShell.Section grow component={ScrollArea} px="md">
        <NavCtx />
        <Divider my="sm" />
        <NavSection items={data.navMain} title="General" />
        <NavSection items={data.admin} title="Admin" />
        <NavSection items={data.api} title="API" />
        <NavSecondary items={data.navSecondary} />
      </AppShell.Section>
      <AppShell.Section p="md">
        <NavUser />
      </AppShell.Section>
    </>
  );
}
