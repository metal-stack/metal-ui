import { IconCopy } from "@tabler/icons-react";
import { ActionIcon, Group, Text } from "@mantine/core";
import classes from "./code-block.module.css";

interface CodeBlockProps {
  data: any;
  title: string;
}

export default function CodeBlock({ data, title }: CodeBlockProps) {
  let jsonString: string;
  try {
    jsonString = JSON.stringify(data, null, 2);
  } catch (error) {
    jsonString = String(data);
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(jsonString);
  };

  return (
    <div className={classes.root}>
      <Group
        justify="space-between"
        px="md"
        py="xs"
        className={classes.header}
      >
        <Text size="sm" fw={600}>
          {title}
        </Text>
        <ActionIcon
          variant="default"
          aria-label="Copy to clipboard"
          onClick={copyToClipboard}
        >
          <IconCopy size={16} />
        </ActionIcon>
      </Group>
      <pre className={classes.pre}>{jsonString}</pre>
    </div>
  );
}
