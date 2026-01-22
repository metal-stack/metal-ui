"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Machine } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { DataTable } from "../ui/data-table/data-table";
import MachineDrawer from "./machine-drawer";

interface MachinesTableProps {
  data: Machine[];
  isAdmin?: boolean;
}

export function MachinesTable({ data, isAdmin }: MachinesTableProps) {
  const columns: ColumnDef<Machine>[] = [
    {
      accessorKey: "uuid",
      header: "UUID",
      enableHiding: false,
      cell: ({ row }) => (
        <MachineDrawer id={row.original.uuid} isAdmin={!!isAdmin} />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.uuid.toString()}
    />
  );
}
