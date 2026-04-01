import { ColumnDef } from "@tanstack/react-table";
import { Partition } from "@metal-stack/api/js/metalstack/api/v2/partition_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link } from "react-router";
import { CopyButton } from "@/components/ui/copy-button";

const columns: ColumnDef<Partition>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link to={"/partitions/" + row.original.id}>{row.original.id}</Link>
        <CopyButton text={row.original.id} variant="ghost" size="sm" className="h-6 w-6" />
      </div>
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
    />
  );
}
