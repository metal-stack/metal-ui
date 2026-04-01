import { ColumnDef } from "@tanstack/react-table";
import { IP } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link, useLocation } from "react-router";
import { IPTypeBadge } from "./ip-info";
import { CopyButton } from "@/components/ui/copy-button";

export function IpsTable({ data }: { data: IP[] }) {
  const location = useLocation();
  const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";
  const columns: ColumnDef<IP>[] = [
    {
      accessorKey: "uuid",
      header: "UUID",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link
            to={
              prefix +
              "/ips/" +
              row.original.ip +
              "?project=" +
              row.original.project
            }
          >
            {row.original.uuid}
          </Link>
          <CopyButton text={row.original.uuid} variant="ghost" size="sm" className="h-6 w-6" />
        </div>
      ),
    },
    {
      accessorKey: "ip",
      header: "IP",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <IPTypeBadge type={row.original.type} /> {row.original.ip}
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
      getRowId={(row) => row.uuid.toString()}
    />
  );
}
