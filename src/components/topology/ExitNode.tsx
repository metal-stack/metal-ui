import { memo } from "react";
import { type NodeProps, type Node } from "@xyflow/react";
import TopologyNode from "./TopologyNode";

function ExitNode(props: NodeProps<Node>) {
  return <TopologyNode {...props} color="red" source />;
}

export default memo(ExitNode);
