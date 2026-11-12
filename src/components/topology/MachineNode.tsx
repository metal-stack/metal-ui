import { memo } from "react";
import { type NodeProps, type Node } from "@xyflow/react";
import TopologyNode from "./TopologyNode";

function MachineNode(props: NodeProps<Node>) {
  return <TopologyNode {...props} color="green" target />;
}

export default memo(MachineNode);
