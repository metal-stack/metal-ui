import {
  Size,
  SizeConstraint,
  SizeConstraintType,
} from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import { DataTable } from "../ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { formatBytesBigInt } from "@/lib/size-utilities";
import { InfoGrid } from "../info-grid/info-grid";

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
    cell: ({ row }) => {
      if (
        row.original.type === SizeConstraintType.MEMORY ||
        row.original.type === SizeConstraintType.STORAGE
      ) {
        return formatBytesBigInt(row.original.min);
      }
      return row.original.min.toString();
    },
  },
  {
    accessorKey: "max",
    header: "Max",
    cell: ({ row }) => {
      if (
        row.original.type === SizeConstraintType.MEMORY ||
        row.original.type === SizeConstraintType.STORAGE
      ) {
        return formatBytesBigInt(row.original.max);
      }
      return row.original.max.toString();
    },
  },
];

export default function SizeInfo({ data }: SizeInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "ID:", value: data.id },
        { label: "Name:", value: data.name },
        { label: "Description:", value: data.description },
        {
          label: "Constraints",
          value: (
            <DataTable
              initialData={data.constraints}
              columns={columns}
              getRowId={(row) => row.type.toString()}
            />
          ),
          fullWidth: true,
        },
      ]}
    />
  );
}
