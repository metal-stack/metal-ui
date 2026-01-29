"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Image } from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link } from "react-router";

const columns: ColumnDef<Image>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
    cell: ({ row }) => (
      <Link to={"/images/" + row.original.id}>{row.original.id}</Link>
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
    />
  );
}
