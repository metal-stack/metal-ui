"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Machine,
  MachineLiveliness,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link, useLocation } from "react-router";

interface MachinesTableProps {
  data: Machine[];
}

export function MachinesTable({ data }: MachinesTableProps) {
  const location = useLocation();
  const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";

  const columns: ColumnDef<Machine>[] = [
    {
      accessorKey: "uuid",
      header: "UUID",
      enableHiding: false,
      cell: ({ row }) => (
        <Link to={prefix + "/machines/" + row.original.uuid}>
          {row.original.uuid}
        </Link>
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
