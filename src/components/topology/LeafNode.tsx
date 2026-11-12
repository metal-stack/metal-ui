import { memo } from "react";
import { type NodeProps, type Node } from "@xyflow/react";
import TopologyNode from "./TopologyNode";

function LeafNode(props: NodeProps<Node>) {
  return <TopologyNode {...props} color="blue" target source />;
}

export default memo(LeafNode);
