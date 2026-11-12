import { ColumnDef } from "@tanstack/react-table";
import { Tenant } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { DataTable } from "../ui/data-table/data-table";
import { TableLink } from "../ui/data-table/table-link";
import { useLocation } from "react-router";

export function TenantTable({ data }: { data: Tenant[] }) {
  const location = useLocation();
  const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";
  const href = (tenant: Tenant) => prefix + "/tenants/" + tenant.login;

  const columns: ColumnDef<Tenant>[] = [
    {
      accessorKey: "login",
      header: "Login",
      cell: ({ row }) => (
        <TableLink to={href(row.original)}>{row.original.login}</TableLink>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "description",
      header: "Description",
    },
  ];

  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.login.toString()}
      getRowHref={href}
    />
  );
}
