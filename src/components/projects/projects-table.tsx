"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Project } from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import { DataTable } from "../ui/data-table/data-table";

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "uuid",
    header: "UUID",
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];

export function ProjectTable({ data }: { data: Project[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.uuid.toString()}
    />
  );
}
