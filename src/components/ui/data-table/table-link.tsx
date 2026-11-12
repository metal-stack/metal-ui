import { Anchor } from "@mantine/core";
import { ReactNode } from "react";
import { Link } from "react-router";

interface TableLinkProps {
  to: string;
  children: ReactNode;
}

/** Link to a detail page, styled in the primary color. */
export function TableLink({ to, children }: TableLinkProps) {
  return (
    <Anchor component={Link} to={to} c="primary" fw={500} underline="hover">
      {children}
    </Anchor>
  );
}
