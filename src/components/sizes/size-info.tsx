import {
  Size,
  SizeConstraint,
  SizeConstraintType,
} from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import { DataTable } from "../ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { formatBytesBigInt } from "@/lib/size-utilities";
import { InfoGrid } from "../info-grid/info-grid";
import { CopyableText } from "../ui/copyable-text";
import { TimestampPill } from "../ui/timestamp-pill";

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
  const metaFields = [];
  if (data.meta?.labels?.labels) {
    const labels = Object.entries(data.meta.labels.labels).map(
      ([key, value]) => `${key}=${value}`
    );
    metaFields.push({ label: "Labels:", value: labels.join(", ") });
  }
  if (data.meta?.createdAt) {
    metaFields.push({
      label: "Created at:",
      value: <TimestampPill timestamp={data.meta.createdAt} />,
    });
  }
  if (data.meta?.updatedAt) {
    metaFields.push({
      label: "Updated at:",
      value: <TimestampPill timestamp={data.meta.updatedAt} />,
    });
  }
  if (data.meta?.generation !== undefined) {
    metaFields.push({ label: "Generation:", value: data.meta.generation });
  }

  return (
    <div className="flex flex-col gap-2">
      <InfoGrid rows={metaFields} />
      <InfoGrid
        rows={[
          { label: "ID:", value: <CopyableText text={data.id} variant="inline" /> },
          { label: "Name:", value: data.name || "—" },
          { label: "Description:", value: data.description || "—" },
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
    </div>
  );
}
