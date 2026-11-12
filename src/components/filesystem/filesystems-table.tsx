"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FilesystemLayout } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import { DataTable } from "../ui/data-table/data-table";
import { TableLink } from "../ui/data-table/table-link";

const href = (fs: FilesystemLayout) => "/filesystems/" + fs.id;

const columns: ColumnDef<FilesystemLayout>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
    cell: ({ row }) => (
      <TableLink to={href(row.original)}>{row.original.id}</TableLink>
    ),
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
      getRowHref={href}
    />
  );
}
