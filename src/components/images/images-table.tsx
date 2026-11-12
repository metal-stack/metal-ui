"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Image } from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import { DataTable } from "../ui/data-table/data-table";
import { TableLink } from "../ui/data-table/table-link";

const href = (image: Image) => "/images/" + image.id;

const columns: ColumnDef<Image>[] = [
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

export function ImagesTable({ data }: { data: Image[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.id.toString()}
      getRowHref={href}
    />
  );
}
