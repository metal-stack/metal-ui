"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IP } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import { DataTable } from "../ui/data-table/data-table";
import IPDrawer from "./ips-drawer";

const columns: ColumnDef<IP>[] = [
  {
    accessorKey: "uuid",
    header: "UUID",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <IPDrawer
          id={row.original.uuid}
          ip={row.original.ip}
          project={row.original.project}
        />
      );
    },
  },
  {
    accessorKey: "ip",
    header: "IP",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "project",
    header: "Project",
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
