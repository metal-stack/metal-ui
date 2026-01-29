import { ColumnDef } from "@tanstack/react-table";
import { Project } from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link, useLocation } from "react-router";

export function ProjectTable({ data }: { data: Project[] }) {
  const location = useLocation();
  const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";
  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "uuid",
      header: "UUID",
      enableHiding: false,
      cell: ({ row }) => (
        <Link to={prefix + "/projects/" + row.original.uuid}>
          {row.original.uuid}
        </Link>
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
