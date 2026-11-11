import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { tileBg } from "@/theme";
import type { ReactNode } from "react";

interface SectionProps {
  title?: ReactNode;
  /** Buttons / menus rendered at the right side of the tile header */
  actions?: ReactNode;
  /** Remove the content padding, e.g. for tables */
  flush?: boolean;
  /** Span all columns when placed inside a SectionGrid */
  fullWidth?: boolean;
  children?: ReactNode;
}

/** A bordered tile used to structure page content. */
export function Section({
  title,
  actions,
  flush,
  fullWidth,
  children,
}: SectionProps) {
  return (
    <Paper
      withBorder
      bg={tileBg}
      radius="lg"
      style={{
        overflow: "hidden",
        gridColumn: fullWidth ? "1 / -1" : undefined,
      }}
    >
      {(title || actions) && (
        <Group justify="space-between" px="lg" pt="md" pb="xs" wrap="nowrap">
          <Text fw={600} size="md">
            {title}
          </Text>
          {actions && <Group gap="xs">{actions}</Group>}
        </Group>
      )}
      {flush ? (
        children
      ) : (
        <div
          style={{
            padding: "var(--mantine-spacing-lg)",
            paddingTop:
              title || actions ? "var(--mantine-spacing-xs)" : undefined,
          }}
        >
          {children}
        </div>
      )}
    </Paper>
  );
}

/** Two-column tile layout (one column on small screens). */
export function SectionGrid({ children }: { children: ReactNode }) {
  return (
    <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md" verticalSpacing="md">
      {children}
    </SimpleGrid>
  );
}
