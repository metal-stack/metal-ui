import { ColumnDef } from "@tanstack/react-table";
import { Network } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link, useLocation } from "react-router";
import { CopyButton } from "@/components/ui/copy-button";

interface NetworksTableProps {
  data: Network[];
}

export function NetworksTable({ data }: NetworksTableProps) {
  const location = useLocation();
  const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";

  const columns: ColumnDef<Network>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link to={prefix + "/networks/" + row.original.id}>
            {row.original.id}
          </Link>
          <CopyButton text={row.original.id} variant="ghost" size="sm" className="h-6 w-6" />
        </div>
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
    />
  );
}
