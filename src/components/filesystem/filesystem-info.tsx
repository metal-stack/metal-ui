import { Filesystem } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table/data-table";
import { CopyableText } from "../ui/copyable-text";

interface FilesystemsInfoProps {
  data: Filesystem[];
}

const columns: ColumnDef<Filesystem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <CopyableText text={row.original.name || ""} variant="inline" />,
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "path",
    header: "Path",
    cell: ({ row }) => <CopyableText text={row.original.path || ""} variant="block" />,
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
      getRowId={(_, index) => index.toString()}
    />
  );
}
