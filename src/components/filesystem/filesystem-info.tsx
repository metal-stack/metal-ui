import { Filesystem } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table/data-table";

interface FilesystemsInfoProps {
  data: Filesystem[];
}

const columns: ColumnDef<Filesystem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "path",
    header: "Path",
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "mountOptions",
    header: "Mount Options",
    cell: ({ row }) => row.original.mountOptions?.join(", "),
  },
  {
    accessorKey: "createOptions",
    header: "Create Options",
    cell: ({ row }) => row.original.createOptions?.join(", "),
  },
];

export default function FilesystemsInfo({ data }: FilesystemsInfoProps) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row, index) => index.toString()}
    />
  );
}
