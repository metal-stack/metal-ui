"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table/data-table";
import { Switch } from "@metal-stack/api/js/metalstack/api/v2/switch_pb";

const columns: ColumnDef<Switch>[] = [
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

export function SwitchesTable({ data }: { data: Switch[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.id.toString()}
    />
  );
}
