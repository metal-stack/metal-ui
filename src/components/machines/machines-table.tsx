"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Machine,
  MachineLiveliness,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
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
      accessorKey: "partition",
      header: "Partition",
      cell: ({ row }) => row.original.partition?.id || "-",
    },
    {
      accessorKey: "rack",
      header: "Rack",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) =>
        row.original.status?.liveliness
          ? MachineLiveliness[row.original.status?.liveliness]
          : "-",
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
