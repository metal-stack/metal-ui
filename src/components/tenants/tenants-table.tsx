"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Tenant } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import TenantDrawer from "./tenant-drawer";
import { DataTable } from "../ui/data-table/data-table";

const columns: ColumnDef<Tenant>[] = [
  {
    accessorKey: "login",
    header: "Login",
    cell: ({ row }) => {
      return <TenantDrawer id={row.original.login} />;
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
