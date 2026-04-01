import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table/data-table";
import { Switch } from "@metal-stack/api/js/metalstack/api/v2/switch_pb";
import SwitchOSBadge from "./switch-os-badge";
import SwitchLastSync from "./switch-last-sync";
import { Link } from "react-router";
import { CopyButton } from "@/components/ui/copy-button";

const columns: ColumnDef<Switch>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link to={"/admin/switches/" + row.original.id}>{row.original.id}</Link>
        <CopyButton text={row.original.id} variant="ghost" size="sm" className="h-6 w-6" />
      </div>
    ),
  },
  {
    accessorKey: "partition",
    header: "Partition",
    cell: ({ row }) => row.original.partition,
  },
  {
    accessorKey: "rack",
    header: "Rack",
  },
  {
    accessorKey: "os",
    header: "OS",
    cell: ({ row }) => <SwitchOSBadge os={row.original.os} />,
  },
  {
    header: "Last Sync",
    cell: ({ row }) => <SwitchLastSync lastSync={row.original.lastSync} />,
  },
];

export function SwitchesTable({ data }: { data: Switch[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.id.toString()}
    />
  );
}
