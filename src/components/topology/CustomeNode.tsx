import { Node } from "@xyflow/react";

export type LeafNode = Node<{}, "leaf">;

export type CustomeNode = LeafNode | Node;
