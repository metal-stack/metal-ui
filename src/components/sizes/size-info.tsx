import { Section } from "@/components/ui/section/section";
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
  title?: string;
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

export default function SizeInfo({ data, title = "Details" }: SizeInfoProps) {
  return (
    <>
      <Section title={title}>
        <InfoGrid
          rows={[
            { label: "ID:", value: data.id },
            { label: "Name:", value: data.name },
            { label: "Description:", value: data.description },
          ]}
        />
      </Section>
      <Section title="Constraints" flush fullWidth>
        <DataTable
          bare
          initialData={data.constraints}
          columns={columns}
          getRowId={(row) => row.type.toString()}
        />
      </Section>
    </>
  );
}
