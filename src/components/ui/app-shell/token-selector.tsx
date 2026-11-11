import { useAuth } from "@/providers/AuthProvider";
import { ActionIcon, Group, Text, UnstyledButton } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { AddTokenDialog } from "./add-token-dialog";

const previewToken = (token: string): string =>
  token.length <= 8 ? token : token.slice(0, 8) + "...";

// Derive active token ID by matching apiToken in allTokens
export function useMultiToken() {
  const { allTokens, switchToken, removeToken, status, apiToken } = useAuth();

  const activeTokenId =
    status === "authenticated"
      ? (allTokens.find((t) => t.token === apiToken)?.id ?? null)
      : null;

  return { allTokens, activeTokenId, switchToken, removeToken };
}

export function TokenList({ onSwitch }: { onSwitch?: () => void }) {
  const { allTokens, activeTokenId, switchToken, removeToken } =
    useMultiToken();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleRemove = (id: string, name: string) => {
    removeToken(id);
    notifications.show({
      color: "green",
      title: "Token removed",
      message: `${name} has been removed.`,
    });
  };

  return (
    <>
      {allTokens.map((token) => (
        <UnstyledButton
          key={token.id}
          px="xs"
          py={6}
          w="100%"
          bg={
            token.id === activeTokenId
              ? "var(--mantine-color-default-hover)"
              : undefined
          }
          style={{ borderRadius: "var(--mantine-radius-sm)" }}
          onClick={() => {
            switchToken(token.id);
            onSwitch?.();
          }}
        >
          <Group justify="space-between" wrap="nowrap">
            <Group gap={6} wrap="nowrap" miw={0}>
              {token.id === activeTokenId && <IconCheck size={14} />}
              <Text size="sm" truncate>
                {token.name}{" "}
                <Text span size="xs" c="dimmed">
                  {previewToken(token.token)}
                </Text>
              </Text>
            </Group>
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              aria-label={`Remove ${token.name}`}
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(token.id, token.name);
              }}
            >
              <IconTrash size={14} />
            </ActionIcon>
          </Group>
        </UnstyledButton>
      ))}
      <UnstyledButton
        px="xs"
        py={6}
        w="100%"
        c="var(--mantine-primary-color-filled)"
        onClick={() => setAddDialogOpen(true)}
      >
        <Group gap={6}>
          <IconPlus size={16} />
          <Text size="sm">Add token</Text>
        </Group>
      </UnstyledButton>
      <AddTokenDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
    </>
  );
}
