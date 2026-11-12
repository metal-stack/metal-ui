import { memo } from "react";
import { Position, Handle, type NodeProps, type Node } from "@xyflow/react";
import { ActionIcon, Popover, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import CodeBlock from "../code-block/code-block";
import classes from "./TopologyNode.module.css";

type TopologyNodeProps = NodeProps<Node> & {
  color: string;
  target?: boolean;
  source?: boolean;
};

function TopologyNode({ id, data, color, target, source }: TopologyNodeProps) {
  const vars = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [
      `--node-${i}`,
      `var(--mantine-color-${color}-${i})`,
    ]),
  ) as React.CSSProperties;

  return (
    <div className={classes.node} style={vars}>
      <Text size="sm" fw={600} inherit>
        {id}
      </Text>
      <Popover withArrow position="bottom" width={360}>
        <Popover.Target>
          <ActionIcon
            variant="subtle"
            color={color}
            aria-label="Info"
            opacity={0.6}
          >
            <IconInfoCircle size={16} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown p={0}>
          <CodeBlock data={data} title={id} />
        </Popover.Dropdown>
      </Popover>
      {target && (
        <Handle
          type="target"
          position={Position.Top}
          className={classes.handle}
        />
      )}
      {source && (
        <Handle
          type="source"
          position={Position.Bottom}
          className={classes.handle}
        />
      )}
    </div>
  );
}

export default memo(TopologyNode);
