import { tileBg } from "@/theme";
import { IconZoomQuestion } from "@tabler/icons-react";
import { Paper, Stack, Text } from "@mantine/core";

export default function NoElementFound() {
  return (
    <Paper withBorder bg={tileBg} radius="lg" p="xl">
      <Stack align="center" gap="md">
        <IconZoomQuestion color="var(--mantine-color-dimmed)" size={48} />
        <Text c="dimmed" ta="center">
          Could not find any elements matching your criteria.
        </Text>
      </Stack>
    </Paper>
  );
}
