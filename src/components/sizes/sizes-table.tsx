"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Size } from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import { DataTable } from "../ui/data-table/data-table";
import SizeDrawer from "./size-drawer";

const columns: ColumnDef<Size>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
    cell: ({ row }) => <SizeDrawer id={row.original.id} />,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];

export function SizesTable({ data }: { data: Size[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.id.toString()}
    />
  );
}
