import { ColumnDef } from "@tanstack/react-table";
import { Size } from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import { DataTable } from "../ui/data-table/data-table";
import { TableLink } from "../ui/data-table/table-link";

const href = (size: Size) => "/sizes/" + size.id;

const columns: ColumnDef<Size>[] = [
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

export function SizesTable({ data }: { data: Size[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.id.toString()}
      getRowHref={href}
    />
  );
}
