import { Node } from "@xyflow/react";

export type LeafNode = Node<{}, "leaf">;

export type SpineNode = Node<{}, "spine">;

export type ExitNode = Node<{}, "exit">;

export type CustomeNode = LeafNode | SpineNode | ExitNode | Node;
