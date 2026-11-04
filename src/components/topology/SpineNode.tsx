import { memo } from "react";
import { type NodeProps, type Node } from "@xyflow/react";
import TopologyNode from "./TopologyNode";

function SpineNode(props: NodeProps<Node>) {
  return <TopologyNode {...props} color="violet" target source />;
}

export default memo(SpineNode);
