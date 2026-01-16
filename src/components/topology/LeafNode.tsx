import { memo } from "react";
import { Position, Handle, type NodeProps, type Node } from "@xyflow/react";

function LeafNode({ id, data }: NodeProps<Node>) {
  return (
    <div className="relative w-32 h-16 bg-blue-200 border border-blue-400 rounded-lg flex items-center justify-center">
      <div>node {id}</div>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}

export default memo(LeafNode);
