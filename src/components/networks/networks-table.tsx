"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Network } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import { DataTable } from "../ui/data-table/data-table";
import NetworkDrawer from "./networks-drawer";

interface NetworksTableProps {
  data: Network[];
  isAdmin: boolean;
}

export function NetworksTable({ data, isAdmin }: NetworksTableProps) {
  const columns: ColumnDef<Network>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enableHiding: false,
      cell: ({ row }) => (
        <NetworkDrawer id={row.original.id} isAdmin={isAdmin} />
      ),
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

  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.id.toString()}
    />
  );
}
