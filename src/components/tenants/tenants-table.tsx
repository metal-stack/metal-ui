import { ColumnDef } from "@tanstack/react-table";
import { Tenant } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link, useLocation } from "react-router";
import { CopyButton } from "@/components/ui/copy-button";

export function TenantTable({ data }: { data: Tenant[] }) {
  const location = useLocation();
  const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";
  const columns: ColumnDef<Tenant>[] = [
    {
      accessorKey: "login",
      header: "Login",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Link to={prefix + "/tenants/" + row.original.login}>
              {row.original.login}
            </Link>
            <CopyButton text={row.original.login} variant="ghost" size="sm" className="h-6 w-6" />
          </div>
        );
      },
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
    />
  );
}
