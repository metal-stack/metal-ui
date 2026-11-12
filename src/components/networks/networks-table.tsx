import { ColumnDef } from "@tanstack/react-table";
import { Network } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import { DataTable } from "../ui/data-table/data-table";
import { TableLink } from "../ui/data-table/table-link";
import { useLocation } from "react-router";

interface NetworksTableProps {
  data: Network[];
}

export function NetworksTable({ data }: NetworksTableProps) {
  const location = useLocation();
  const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";

  const href = (network: Network) => prefix + "/networks/" + network.id;

  const columns: ColumnDef<Network>[] = [
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
    {
      accessorKey: "project",
      header: "Project",
    },
  ];

  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.id.toString()}
      getRowHref={href}
    />
  );
}
