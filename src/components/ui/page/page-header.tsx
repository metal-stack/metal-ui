import { Group, Title } from "@mantine/core";
import { createContext, useContext, type ReactNode } from "react";
import { createPortal } from "react-dom";

export const PageActionsContext = createContext<HTMLElement | null>(null);

/** Heading (left) and slot for buttons and menus (right). */
export function PageHeader({
  title,
  setActionsEl,
}: {
  title: string;
  setActionsEl: (el: HTMLElement | null) => void;
}) {
  return (
    <Group
      justify="space-between"
      align="center"
      wrap="nowrap"
      mb="lg"
      mih={36}
    >
      <Title order={2}>{title}</Title>
      <Group gap="xs" wrap="nowrap" ref={setActionsEl} />
    </Group>
  );
}

/** Renders its children into the right side of the page header. */
/** @lintignore Slot for future header actions (write operations). */
export function PageActions({ children }: { children: ReactNode }) {
  const el = useContext(PageActionsContext);
  return el ? createPortal(children, el) : null;
}
