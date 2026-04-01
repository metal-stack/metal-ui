import { ColumnDef } from "@tanstack/react-table";
import { Token } from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link } from "react-router";
import { CopyButton } from "@/components/ui/copy-button";

const columns: ColumnDef<Token>[] = [
  {
    accessorKey: "uuid",
    header: "UUID",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link to={"/tokens/" + row.original.uuid}>{row.original.uuid}</Link>
        <CopyButton text={row.original.uuid} variant="ghost" size="sm" className="h-6 w-6" />
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];

export function TokensTable({ data }: { data: Token[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.uuid.toString()}
    />
  );
}
