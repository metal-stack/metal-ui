import { IconZoomQuestion } from "@tabler/icons-react";
import { Paper, Stack, Text } from "@mantine/core";

export default function NoElementFound() {
  return (
    <Paper withBorder p="xl">
      <Stack align="center" gap="md">
        <IconZoomQuestion color="var(--mantine-color-dimmed)" size={48} />
        <Text c="dimmed" ta="center">
          Could not find any elements matching your criteria.
        </Text>
      </Stack>
    </Paper>
  );
}
