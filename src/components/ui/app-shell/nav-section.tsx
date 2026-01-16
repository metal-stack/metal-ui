"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import { useMethods } from "@/providers/MethodsProvider";
import { useMemo } from "react";
import { NavItem } from "./app-sidebar";

export function NavSection({
  items,
  title,
}: {
  items: NavItem[];
  title: string;
}) {
  const location = useLocation();
  const { isAllowed } = useMethods();

  const visibleItems = useMemo(
    () =>
      items.filter((item) => {
        if (!item.requires) return true; // public item
        return isAllowed(item.requires.methods, {
          any: item.requires.any ?? true,
        });
      }),
    [items, isAllowed]
  );

  if (visibleItems.length === 0) return null;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {visibleItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === item.url}
            >
              <Link to={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
