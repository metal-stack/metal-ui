import { IconCopy } from "@tabler/icons-react";
import { ActionIcon, Group, Text } from "@mantine/core";
import classes from "./code-block.module.css";

interface CodeBlockProps {
  data: any;
  title: string;
  /** Show only the code with a floating copy button, for use inside a flush Section that has its own title */
  bare?: boolean;
}

export default function CodeBlock({ data, title, bare }: CodeBlockProps) {
  let jsonString: string;
  try {
    jsonString = JSON.stringify(data, null, 2);
  } catch (error) {
    jsonString = String(data);
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(jsonString);
  };

  const copyButton = (
    <ActionIcon
      variant="default"
      aria-label="Copy to clipboard"
      onClick={copyToClipboard}
    >
      <IconCopy size={16} />
    </ActionIcon>
  );

  if (bare) {
    // The surrounding Section already provides the title, so only the code is shown.
    return (
      <div style={{ position: "relative" }}>
        <pre className={classes.pre}>{jsonString}</pre>
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          {copyButton}
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Group justify="space-between" px="md" py="xs" className={classes.header}>
        <Text size="sm" fw={600}>
          {title}
        </Text>
        {copyButton}
      </Group>
      <pre className={classes.pre}>{jsonString}</pre>
    </div>
  );
}
