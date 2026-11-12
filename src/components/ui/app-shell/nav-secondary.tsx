import { type Icon } from "@tabler/icons-react";
import { NavLink } from "@mantine/core";
import { Link } from "react-router";

export function NavSecondary({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: Icon;
  }[];
}) {
  return (
    <>
      {items.map((item) => (
        <NavLink
          key={item.title}
          component={Link}
          to={item.url}
          label={item.title}
          leftSection={<item.icon size={18} />}
        />
      ))}
    </>
  );
}
