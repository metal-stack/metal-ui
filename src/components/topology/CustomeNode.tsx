import { Node } from "@xyflow/react";

export type LeafNode = Node<Record<string, unknown>, "leaf">;

export type SpineNode = Node<Record<string, unknown>, "spine">;

export type ExitNode = Node<Record<string, unknown>, "exit">;

export type MachineNode = Node<Record<string, unknown>, "machine">;

export type CustomeNode = LeafNode | SpineNode | ExitNode | MachineNode | Node;
