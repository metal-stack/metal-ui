"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Image } from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link } from "react-router";
import { CopyButton } from "@/components/ui/copy-button";

const columns: ColumnDef<Image>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link to={"/images/" + row.original.id}>{row.original.id}</Link>
        <CopyButton text={row.original.id} variant="ghost" size="sm" className="h-6 w-6" />
      </div>
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
