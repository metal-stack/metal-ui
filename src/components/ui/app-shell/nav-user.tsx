import { IconDotsVertical, IconLogout } from "@tabler/icons-react";
import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { useUser } from "@/providers/UserProvider";
import { useAuthenticatedAuth } from "@/providers/AuthProvider";

export function NavUser() {
  const user = useUser();
  const auth = useAuthenticatedAuth();

  return (
    <Menu position="right-end" width={220}>
      <Menu.Target>
        <UnstyledButton w="100%">
          <Group wrap="nowrap">
            <Avatar src={user.avatarUrl} alt={user.name} radius="md">
              {user.name?.slice(0, 2).toUpperCase()}
            </Avatar>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text size="sm" fw={500} truncate>
                {user.name}
              </Text>
              <Text size="xs" c="dimmed" truncate>
                {user.email}
              </Text>
            </div>
            <IconDotsVertical size={16} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconLogout size={16} />}
          onClick={() => auth.logout()}
        >
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
