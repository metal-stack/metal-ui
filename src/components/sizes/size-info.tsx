import {
  Size,
  SizeConstraint,
  SizeConstraintType,
} from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import { DataTable } from "../ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { formatBytesBigInt } from "@/lib/size-utilities";
import { toast } from "sonner";
import { CopyIcon, FingerprintPattern } from "lucide-react";
import { IdentityCard } from "../identity-card/identity-card";
import CollapsibleSection from "../collapsible-section/collapsible-section";
import SizeConstraintBadge from "./size-constraint-badge";

interface SizeInfoProps {
  data: Size;
}

const columns: ColumnDef<SizeConstraint>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <SizeConstraintBadge type={row.original.type} withLabel />
    ),
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
  const handleCopyId = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Copied id");
  };

  const header = (
    <>
      {/* Login / ID */}
      <div className="flex items-center gap-2 text-sm">
        <FingerprintPattern className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-muted-foreground">ID:</span>
        <button
          onClick={handleCopyId}
          className="font-bold text-xs flex items-center gap-1"
          aria-label="Copy Login"
          title={data.id}
        >
          {data.id}
          <CopyIcon className="size-3" />
        </button>
      </div>

      {/* Name */}
      {data.name && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Name:</span>
          <span>{data.name}</span>
        </div>
      )}

      {/* Email */}
      {data.description && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Description:</span>
          <span>{data.description}</span>
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col gap-3">
      <IdentityCard header={header} meta={data.meta} />

      {/* Constraints */}
      <CollapsibleSection title="Constraints">
        {data.constraints && (
          <DataTable initialData={data.constraints} columns={columns} />
        )}
      </CollapsibleSection>
    </div>
  );
}
