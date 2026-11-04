import { NavLink, Text } from "@mantine/core";
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
    <>
      <Text size="xs" c="dimmed" fw={500} mt="sm" mb={4}>
        {title}
      </Text>
      {visibleItems.map((item) => (
        <NavLink
          key={item.title}
          component={Link}
          to={item.url}
          label={item.title}
          leftSection={<item.icon size={18} />}
          active={location.pathname === item.url}
        />
      ))}
    </>
  );
}
