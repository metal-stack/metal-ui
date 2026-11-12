import CodeBlock from "@/components/code-block/code-block";
import { Alert, Anchor, Stack } from "@mantine/core";
import { useMethods } from "@/providers/MethodsProvider";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function Dashboard() {
  const methodsCtx = useMethods();

  return (
    <Stack gap="md">
      <Alert
        variant="light"
        color="yellow"
        title="Warning"
        icon={<IconAlertTriangle size={18} />}
      >
        This UI is under construction. It builds on top of the Metal API with{" "}
        <Anchor
          inherit
          rel="noopener noreferrer"
          target="_blank"
          href="https://metal-stack.io/docs/MEP-4-multi-tenancy-for-the-metal-api"
        >
          MEP-4
        </Anchor>
        .
      </Alert>
      <CodeBlock data={methodsCtx.tokenScope} title="Token scope" />
      <CodeBlock
        data={methodsCtx.methodsPermissions}
        title="Methods permissions"
      />
    </Stack>
  );
}
