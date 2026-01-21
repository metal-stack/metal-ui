import { memo } from "react";
import { Position, Handle, type NodeProps, type Node } from "@xyflow/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { IconInfoCircle } from "@tabler/icons-react";
import CodeBlock from "../code-block/code-block";

function LeafNode({ id, data }: NodeProps<Node>) {
  return (
    <div className="w-40 h-14 rounded-xl border border-blue-300 bg-gradient-to-b from-blue-100 to-blue-200 shadow-sm flex items-center justify-between px-3">
      <span className="text-sm font-semibold text-blue-900">{id}</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="text-blue-700 opacity-40 hover:bg-blue-300/40"
          >
            <IconInfoCircle size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <CodeBlock data={data} title={id}></CodeBlock>
        </PopoverContent>
      </Popover>

      <Handle type="target" position={Position.Top} className="!bg-blue-400" />
    </div>
  );
}

export default memo(LeafNode);
