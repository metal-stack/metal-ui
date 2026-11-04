import { useAuth } from "@/providers/AuthProvider";
import { ActionIcon, Button, Menu, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconChevronDown,
  IconKey,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { AddTokenDialog } from "./add-token-dialog";

export function TokenSelector() {
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

  const previewToken = (token: string): string => {
    if (token.length <= 8) return token;
    return token.slice(0, 8) + "...";
  };

  return (
    <>
      <Menu width={260} position="bottom-start">
        <Menu.Target>
          <Button
            variant="default"
            size="xs"
            fullWidth
            justify="space-between"
            leftSection={<IconKey size={16} />}
            rightSection={<IconChevronDown size={12} />}
          >
            {activeTokenId
              ? (allTokens.find((t) => t.id === activeTokenId)?.name ??
                "No token")
              : "No token"}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {allTokens.map((token) => (
            <Menu.Item
              key={token.id}
              bg={
                token.id === activeTokenId
                  ? "var(--mantine-color-default-hover)"
                  : undefined
              }
              onClick={() => switchToken(token.id)}
              rightSection={
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
              }
            >
              {token.name}{" "}
              <Text span size="xs" c="dimmed">
                {previewToken(token.token)}
              </Text>
            </Menu.Item>
          ))}

          {allTokens.length > 0 && <Menu.Divider />}

          <Menu.Item
            c="var(--mantine-primary-color-filled)"
            leftSection={<IconPlus size={16} />}
            onClick={() => setAddDialogOpen(true)}
          >
            Add token
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <AddTokenDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
    </>
  );
}

// Derive active token ID by matching apiToken in allTokens
function useMultiToken() {
  const { allTokens, switchToken, removeToken, status, apiToken } = useAuth();

  const activeTokenId =
    status === "authenticated"
      ? (allTokens.find((t) => t.token === apiToken)?.id ?? null)
      : null;

  return {
    allTokens,
    activeTokenId,
    switchToken,
    removeToken,
  };
}
