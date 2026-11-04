import { useState } from "react";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import * as zod from "zod";
import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/providers/AuthProvider";
import { IconPlus } from "@tabler/icons-react";

const formSchema = zod.object({
  name: zod
    .string()
    .min(1, "Name is required")
    .max(64, "Name must be 64 characters or less"),
  token: zod.string().min(10, "Token must be at least 10 characters"),
});

type FormValues = zod.infer<typeof formSchema>;

export function AddTokenDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const addToken = useAuth().addToken;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: { name: "", token: "" },
    validate: zod4Resolver(formSchema),
  });

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    try {
      addToken(values.name.trim(), values.token.trim(), apiUrl);
      form.reset();
      onOpenChange(false);
      notifications.show({
        color: "green",
        title: "Token added",
        message: `${values.name.trim()} has been added to your token library.`,
      });
    } catch (err) {
      notifications.show({
        color: "red",
        title: "Failed to add token",
        message: String(err),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      opened={open}
      onClose={() => onOpenChange(false)}
      title="Add API Token"
      size="md"
    >
      <Text size="sm" c="dimmed" mb="md">
        Paste a token you created via the CLI to add it to your token library.
      </Text>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="e.g. my-laptop"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <PasswordInput
            label="Token"
            placeholder="Paste your token here..."
            key={form.key("token")}
            {...form.getInputProps("token")}
          />
          <Paper withBorder p="sm">
            <Text size="xs" c="dimmed">
              <Text span fw={500} inherit>
                API URL:
              </Text>{" "}
              {apiUrl}
            </Text>
          </Paper>
          <Group justify="flex-end">
            <Button
              type="submit"
              loading={isSubmitting}
              leftSection={<IconPlus size={16} />}
            >
              Add token
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
