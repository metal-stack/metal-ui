import {
  Node,
  Edge,
  ReactFlow,
  ConnectionLineType,
  useEdgesState,
  useNodesState,
  Background,
  Controls,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";

import "@xyflow/react/dist/style.css";
import LeafNode from "@/components/topology/LeafNode";
import { CustomeNode } from "@/components/topology/CustomeNode";
import SpineNode from "@/components/topology/SpineNode";
import ExitNode from "@/components/topology/ExitNode";

const initialNodes: CustomeNode[] = [
  // Exit
  {
    id: "exit-0",
    position: { x: 0, y: 0 },
    data: { label: "Exit Switch" },
    type: "exit",
  },

  // Spines
  {
    id: "spine-0",
    position: { x: 0, y: 0 },
    data: { label: "Spine 0" },
    type: "spine",
  },
  {
    id: "spine-1",
    position: { x: 0, y: 0 },
    data: { label: "Spine 1" },
    type: "spine",
  },

  // Leafs
  {
    id: "leaf-0",
    position: { x: 0, y: 0 },
    data: { label: "Leaf 0" },
    type: "leaf",
  },
  {
    id: "leaf-1",
    position: { x: 0, y: 0 },
    data: { label: "Leaf 1" },
    type: "leaf",
  },
];
const initialEdges: Edge[] = [
  // Exit -> Spines
  {
    id: "e-exit-spine-0",
    source: "exit-0",
    target: "spine-0",
    type: ConnectionLineType.Straight,
  },
  {
    id: "e-exit-spine-1",
    source: "exit-0",
    target: "spine-1",
    type: ConnectionLineType.Straight,
  },

  // Spine -> Leaf (Full Mesh)
  {
    id: "e-spine-0-leaf-0",
    source: "spine-0",
    target: "leaf-0",
    type: ConnectionLineType.Straight,
  },
  {
    id: "e-spine-0-leaf-1",
    source: "spine-0",
    target: "leaf-1",
    type: ConnectionLineType.Straight,
  },
  {
    id: "e-spine-1-leaf-0",
    source: "spine-1",
    target: "leaf-0",
    type: ConnectionLineType.Straight,
  },
  {
    id: "e-spine-1-leaf-1",
    source: "spine-1",
    target: "leaf-1",
    type: ConnectionLineType.Straight,
  },
];
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
): { nodes: Node[]; edges: Edge[] } => {
  dagreGraph.setGraph({ rankdir: "TB" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);

const nodeTypes = {
  leaf: LeafNode,
  spine: SpineNode,
  exit: ExitNode,
};

export default function TopologyPage() {
  const [nodes] = useNodesState(layoutedNodes);
  const [edges] = useEdgesState(layoutedEdges);
  return (
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
      <Background />
      <Controls />
    </ReactFlow>
  );
}
