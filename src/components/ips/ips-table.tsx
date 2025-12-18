"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IP } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import { DataTable } from "../ui/data-table/data-table";

const columns: ColumnDef<IP>[] = [
  {
    accessorKey: "uuid",
    header: "UUID",
    enableHiding: false,
  },
  {
    accessorKey: "ip",
    header: "IP",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];

export function IpsTable({ data }: { data: IP[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.uuid.toString()}
    />
  );
}
