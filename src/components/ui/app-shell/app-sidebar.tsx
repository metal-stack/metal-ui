"use client";
import * as React from "react";
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
  IconSwitch2,
  IconTopologyStarRing2,
} from "@tabler/icons-react";
import { NavSection } from "@/components/ui/app-shell/nav-section";
import { NavMain } from "@/components/ui/app-shell/nav-main";
import { NavSecondary } from "@/components/ui/app-shell/nav-secondary";
import { NavUser } from "@/components/ui/app-shell/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import logo from "@/assets/metal-stack.png";
import { NavCtx } from "./nav-ctx";
import { Separator } from "../separator";

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
  ],
  //TODO add some items here later
  navSecondary: [],
  api: [
    {
      title: "Tenants",
      url: "/tenants",
      icon: IconBuilding,
      requires: {
        methods: [
          "/metalstack.api.v2.TenantService/List",
          "/metalstack.api.v2.TenantService/Get",
        ],
        any: false,
      },
    },
    {
      title: "Projects",
      url: "/projects",
      icon: IconRocket,
      requires: {
        methods: [
          "/metalstack.api.v2.ProjectService/List",
          "/metalstack.api.v2.ProjectService/Get",
        ],
        any: false,
      },
    },
    {
      title: "Partitions",
      url: "/partitions",
      icon: IconCloudPin,
      requires: {
        methods: [
          "/metalstack.api.v2.PartitionService/List",
          "/metalstack.api.v2.PartitionService/Get",
        ],
        any: false,
      },
    },
    {
      title: "Machines",
      url: "/machines",
      icon: IconServer2,
      requires: {
        methods: [
          "/metalstack.api.v2.MachineService/Get",
          "/metalstack.api.v2.MachineService/List",
        ],
        any: false,
      },
    },
    {
      title: "Sizes",
      url: "/sizes",
      icon: IconMaximize,
      requires: {
        methods: [
          "/metalstack.api.v2.SizeService/List",
          "/metalstack.api.v2.SizeService/Get",
        ],
        any: false,
      },
    },
    {
      title: "Images",
      url: "/images",
      icon: IconPackage,
      requires: {
        methods: [
          "/metalstack.api.v2.ImageService/List",
          "/metalstack.api.v2.ImageService/Get",
        ],
        any: false,
      },
    },
    {
      title: "IPs",
      url: "/ips",
      icon: IconGlobe,
      requires: {
        methods: [
          "/metalstack.api.v2.IPService/List",
          "/metalstack.api.v2.IPService/Get",
        ],
        any: false,
      },
    },
    {
      title: "Networks",
      url: "/networks",
      icon: IconNetwork,
      requires: {
        methods: [
          "/metalstack.api.v2.NetworkService/List",
          "/metalstack.api.v2.NetworkService/Get",
        ],
        any: false,
      },
    },
    {
      title: "Filesystems",
      url: "/filesystems",
      icon: IconDeviceSdCard,
      requires: {
        methods: [
          "/metalstack.api.v2.FilesystemService/List",
          "/metalstack.api.v2.FilesystemService/Get",
        ],
        any: false,
      },
    },
    {
      title: "Tokens",
      url: "/tokens",
      icon: IconKey,
      requires: {
        methods: [
          "/metalstack.api.v2.TokenService/List",
          "/metalstack.api.v2.TokenService/Get",
        ],
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
        methods: ["/metalstack.admin.v2.TenantService/List"],
        any: false,
      },
    },
    {
      title: "Projects",
      url: "/admin/projects",
      icon: IconRocket,
      requires: {
        methods: ["/metalstack.admin.v2.ProjectService/List"],
        any: false,
      },
    },
    {
      title: "Machines",
      url: "/admin/machines",
      icon: IconServer2,
      requires: {
        methods: [
          "/metalstack.admin.v2.MachineService/List",
          "/metalstack.admin.v2.MachineService/Get",
        ],
        any: false,
      },
    },
    {
      title: "IPs",
      url: "/admin/ips",
      icon: IconGlobe,
      requires: {
        methods: ["/metalstack.admin.v2.IPService/List"],
        any: false,
      },
    },
    {
      title: "Networks",
      url: "/admin/networks",
      icon: IconNetwork,
      requires: {
        methods: [
          "/metalstack.admin.v2.NetworkService/List",
          "/metalstack.admin.v2.NetworkService/Get",
        ],
        any: false,
      },
    },
    {
      title: "Switches",
      url: "/admin/switches",
      icon: IconSwitch2,
      requires: {
        methods: [
          "/metalstack.admin.v2.SwitchService/List",
          "/metalstack.admin.v2.SwitchService/Get",
        ],
        any: false,
      },
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <img src={logo} alt="metal-stack" className="h-5 w-5" />
                <span className="text-base font-semibold">metal-stack.io</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavCtx />
        <Separator />
        <NavMain items={data.navMain} />
        <NavSection items={data.admin} title="Admin" />
        <NavSection items={data.api} title="API" />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
