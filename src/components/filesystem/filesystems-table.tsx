"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FilesystemLayout } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import { DataTable } from "../ui/data-table/data-table";
import FilesystemDrawer from "./filesystem-drawer";

const columns: ColumnDef<FilesystemLayout>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
    cell: ({ row }) => <FilesystemDrawer id={row.original.id} />,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];

export function FilesystemsTable({ data }: { data: FilesystemLayout[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.id.toString()}
    />
  );
}
