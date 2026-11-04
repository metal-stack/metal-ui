import * as React from "react";
import { ActionIcon, Collapse, Divider, Group, Text } from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";

type InfoCollapsibleProps = {
  title: string;
  children?: React.ReactNode;
};

export default function InfoCollapsible({
  title,
  children,
}: InfoCollapsibleProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Group justify="space-between">
        <Text fw={600} c="var(--mantine-primary-color-filled)">
          {title}:
        </Text>
        {children ? (
          <ActionIcon
            variant="subtle"
            color="gray"
            size="sm"
            aria-label="Toggle"
            onClick={() => setOpen((o) => !o)}
          >
            <IconSelector size={16} />
          </ActionIcon>
        ) : (
          <Text size="sm" c="dimmed">
            No data
          </Text>
        )}
      </Group>
      <Collapse expanded={open}>
        <Divider my="xs" />
        {children}
        <Divider my="xs" />
      </Collapse>
    </div>
  );
}
