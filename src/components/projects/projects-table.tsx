import { ColumnDef } from "@tanstack/react-table";
import { Project } from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link, useLocation } from "react-router";
import { CopyButton } from "@/components/ui/copy-button";

export function ProjectTable({ data }: { data: Project[] }) {
  const location = useLocation();
  const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";
  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "uuid",
      header: "UUID",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link to={prefix + "/projects/" + row.original.uuid}>
            {row.original.uuid}
          </Link>
          <CopyButton text={row.original.uuid} variant="ghost" size="sm" className="h-6 w-6" />
        </div>
      ),
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
      getRowId={(row) => row.uuid.toString()}
    />
  );
}
