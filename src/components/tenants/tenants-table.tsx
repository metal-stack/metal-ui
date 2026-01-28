import { ColumnDef } from "@tanstack/react-table";
import { Tenant } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link } from "react-router";

const columns: ColumnDef<Tenant>[] = [
  {
    accessorKey: "login",
    header: "Login",
    cell: ({ row }) => {
      return (
        <Link to={"/tenants/" + row.original.login}>{row.original.login}</Link>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];

export function TenantTable({ data }: { data: Tenant[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.login.toString()}
    />
  );
}
