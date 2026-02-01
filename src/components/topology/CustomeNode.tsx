import { Node } from "@xyflow/react";

export type LeafNode = Node<{}, "leaf">;

export type SpineNode = Node<{}, "spine">;

export type ExitNode = Node<{}, "exit">;

export type MachineNode = Node<{}, "machine">;

export type CustomeNode = LeafNode | SpineNode | ExitNode | MachineNode | Node;
