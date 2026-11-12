import { ColumnDef } from "@tanstack/react-table";
import { Partition } from "@metal-stack/api/js/metalstack/api/v2/partition_pb";
import { DataTable } from "../ui/data-table/data-table";
import { TableLink } from "../ui/data-table/table-link";

const href = (partition: Partition) => "/partitions/" + partition.id;

const columns: ColumnDef<Partition>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
    cell: ({ row }) => (
      <TableLink to={href(row.original)}>{row.original.id}</TableLink>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];

export function PartitionsTable({ data }: { data: Partition[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.id.toString()}
      getRowHref={href}
    />
  );
}
