"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Token } from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import { DataTable } from "../ui/data-table/data-table";
import TokenDrawer from "./token-drawer";

const columns: ColumnDef<Token>[] = [
  {
    accessorKey: "uuid",
    header: "UUID",
    enableHiding: false,
    cell: ({ row }) => <TokenDrawer uuid={row.original.uuid} />,
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];

export function TokensTable({ data }: { data: Token[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.uuid.toString()}
    />
  );
}
