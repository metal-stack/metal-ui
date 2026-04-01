import { ColumnDef } from "@tanstack/react-table";
import {
  Machine,
  MachineLiveliness,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { DataTable } from "../ui/data-table/data-table";
import { StatusPill } from "../ui/status-pill";
import { Link, useLocation } from "react-router";
import { CopyButton } from "@/components/ui/copy-button";

interface MachinesTableProps {
  data: Machine[];
}

export function MachinesTable({ data }: MachinesTableProps) {
  const location = useLocation();
  const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";

  const columns: ColumnDef<Machine>[] = [
    {
      accessorKey: "uuid",
      header: "UUID",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link to={prefix + "/machines/" + row.original.uuid}>
            {row.original.uuid}
          </Link>
          <CopyButton text={row.original.uuid} variant="ghost" size="sm" className="h-6 w-6" />
        </div>
      ),
    },
    {
      accessorKey: "partition",
      header: "Partition",
      cell: ({ row }) => row.original.partition?.id || "-",
    },
    {
      accessorKey: "rack",
      header: "Rack",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const liveliness = row.original.status?.liveliness;
        if (!liveliness) return "-";

        let statusVariant:
          | "online"
          | "offline"
          | "warning"
          | "error"
          | "pending" = "pending";
        switch (liveliness) {
          case MachineLiveliness.ALIVE:
            statusVariant = "online";
            break;
          case MachineLiveliness.DEAD:
            statusVariant = "error";
            break;
          default:
            statusVariant = "offline";
            break;
        }

        return (
          <StatusPill
            status={statusVariant}
            label={MachineLiveliness[liveliness]}
          />
        );
      },
    },
  ];

  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.uuid.toString()}
      showHover={true}
    />
  );
}
