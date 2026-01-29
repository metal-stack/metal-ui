import { ColumnDef } from "@tanstack/react-table";
import { IP } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link, useLocation } from "react-router";

export function IpsTable({ data }: { data: IP[] }) {
  const location = useLocation();
  const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";
  const columns: ColumnDef<IP>[] = [
    {
      accessorKey: "uuid",
      header: "UUID",
      enableHiding: false,
      cell: ({ row }) => (
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
      ),
    },
    {
      accessorKey: "ip",
      header: "IP",
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
