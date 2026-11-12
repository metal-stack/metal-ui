import { ColumnDef } from "@tanstack/react-table";
import { IP } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import { DataTable } from "../ui/data-table/data-table";
import { TableLink } from "../ui/data-table/table-link";
import { useLocation } from "react-router";
import { IPTypeBadge } from "./ip-info";

export function IpsTable({ data }: { data: IP[] }) {
  const location = useLocation();
  const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";
  const href = (ip: IP) => prefix + "/ips/" + ip.ip + "?project=" + ip.project;

  const columns: ColumnDef<IP>[] = [
    {
      accessorKey: "uuid",
      header: "UUID",
      enableHiding: false,
      cell: ({ row }) => (
        <TableLink to={href(row.original)}>{row.original.uuid}</TableLink>
      ),
    },
    {
      accessorKey: "ip",
      header: "IP",
      cell: ({ row }) => (
        <>
          <IPTypeBadge type={row.original.type} /> {row.original.ip}
        </>
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
      getRowHref={href}
    />
  );
}
