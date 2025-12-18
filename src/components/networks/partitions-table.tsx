"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Network } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import { DataTable } from "../ui/data-table/data-table";

const columns: ColumnDef<Network>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];

export function NetworksTable({ data }: { data: Network[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.id.toString()}
    />
  );
}
