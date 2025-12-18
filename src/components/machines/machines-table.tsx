"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Machine } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { DataTable } from "../ui/data-table/data-table";

const columns: ColumnDef<Machine>[] = [
  {
    accessorKey: "uuid",
    header: "UUID",
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export function MachinesTable({ data }: { data: Machine[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.uuid.toString()}
    />
  );
}
