import { Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <Center h="100%" mih="100vh">
      <Stack align="center">
        <Title order={1} size={48}>
          404
        </Title>
        <Text size="lg">The page you are looking for does not exist.</Text>
        <Group>
          <Button component={Link} to="/login" variant="default">
            Zurück zum Login
          </Button>
          <Button component={Link} to="/">
            Zurück zum Dashboard
          </Button>
        </Group>
      </Stack>
    </Center>
  );
}
