import {
  Size,
  SizeConstraint,
  SizeConstraintType,
} from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import { DataTable } from "../ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";

interface SizeInfoProps {
  data: Size;
}

const columns: ColumnDef<SizeConstraint>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => SizeConstraintType[row.original.type],
  },
  {
    accessorKey: "identifier",
    header: "Identifier",
  },
  {
    accessorKey: "min",
    header: "Min",
  },
  {
    accessorKey: "max",
    header: "Max",
  },
];

export default function SizeInfo({ data }: SizeInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>ID:</strong> {data.id}
      </div>
      <div>
        <strong>Name:</strong> {data.name}
      </div>
      <div>
        <strong>Description:</strong> {data.description}
      </div>
      <div className="flex flex-col">
        <strong>Constraints:</strong>
        <DataTable
          initialData={data.constraints}
          columns={columns}
          getRowId={(row) => row.type.toString()}
        />
      </div>
    </div>
  );
}
