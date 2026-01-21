import { memo } from "react";
import { Position, Handle, type NodeProps, type Node } from "@xyflow/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { IconInfoCircle } from "@tabler/icons-react";
import CodeBlock from "../code-block/code-block";

function SpineNode({ id, data }: NodeProps<Node>) {
  return (
    <div className="w-40 h-14 rounded-xl border border-violet-300 bg-gradient-to-b from-violet-100 to-violet-200 shadow-sm flex items-center justify-between px-3">
      <span className="text-sm font-semibold text-violet-900">{id}</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="text-violet-700 opacity-40 hover:bg-violet-300/40"
          >
            <IconInfoCircle size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <CodeBlock data={data} title={id}></CodeBlock>
        </PopoverContent>
      </Popover>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-violet-400"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-violet-400"
      />
    </div>
  );
}

export default memo(SpineNode);
