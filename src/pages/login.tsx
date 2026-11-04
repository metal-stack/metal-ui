import { Button, Center, Image, Paper, Stack, Title } from "@mantine/core";
import logo from "@/assets/metal-stack.png";

const VITE_API_URL = import.meta.env.VITE_API_URL ?? "";

export default function Login() {
  return (
    <Center mih="100vh">
      <Paper withBorder shadow="md" p="xl" w="100%" maw={420}>
        <Stack align="center">
          <Image src={logo} alt="metal-stack" w={64} h={64} />
          <Title order={2}>Login</Title>
          <Button
            fullWidth
            onClick={() => {
              window.location.href =
                `${VITE_API_URL}/auth/openid-connect?redirect-url=` +
                encodeURIComponent(window.location.origin + "/auth/callback");
            }}
          >
            Connect
          </Button>
        </Stack>
      </Paper>
    </Center>
  );
}
