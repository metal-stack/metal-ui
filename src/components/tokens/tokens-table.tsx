import { ColumnDef } from "@tanstack/react-table";
import { Token } from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link } from "react-router";
import { TokenTypeBadge } from "./token-info";
import { formatDate } from "@/lib/date-formatting";
import { timestampDate } from "@bufbuild/protobuf/wkt";

const columns: ColumnDef<Token>[] = [
  {
    accessorKey: "uuid",
    header: "UUID",
    enableHiding: false,
    cell: ({ row }) => (
      <Link to={"/tokens/" + row.original.uuid}>{row.original.uuid}</Link>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "tokenType",
    header: "Token type",
    cell: ({ row }) => (
      <TokenTypeBadge type={row.original.tokenType} withLabel />
    ),
  },
  {
    accessorKey: "issuedAt",
    header: "Issued At",
    cell: ({ row }) =>
      row.original.issuedAt
        ? formatDate(timestampDate(row.original.issuedAt))
        : null,
  },
  {
    accessorKey: "expires",
    header: "Expires At",
    cell: ({ row }) =>
      row.original.expires
        ? formatDate(timestampDate(row.original.expires))
        : null,
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
