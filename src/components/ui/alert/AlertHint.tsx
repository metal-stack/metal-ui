import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

interface AlertHintProps {
  title: string;
  description?: string;
}

export default function AlertHint({ title, description }: AlertHintProps) {
  return (
    <Alert
      color="red"
      variant="light"
      title={title}
      icon={<IconAlertCircle size={18} />}
    >
      {description}
    </Alert>
  );
}
