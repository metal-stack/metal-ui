import { ColumnDef } from "@tanstack/react-table";
import { Size } from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link } from "react-router";

const columns: ColumnDef<Size>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
    cell: ({ row }) => (
      <Link to={"/sizes/" + row.original.id}>{row.original.id}</Link>
    ),
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
