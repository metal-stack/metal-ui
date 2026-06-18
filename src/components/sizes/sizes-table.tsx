import { ColumnDef } from "@tanstack/react-table";
import { Size } from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import { DataTable } from "../ui/data-table/data-table";
import { Link } from "react-router";
import SizeConstraintBadge from "./size-constraint-badge";

const columns: ColumnDef<Size>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
    cell: ({ row }) => (
      <Link to={"/sizes/" + row.original.id}>{row.original.id}</Link>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "constraints",
    header: "Constraints",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original.constraints.map((constraint) => (
          <SizeConstraintBadge
            type={constraint.type}
            withLabel
            sizeConfig={{ min: constraint.min, max: constraint.max }}
          />
        ))}
      </div>
    ),
  },
];

export function SizesTable({ data }: { data: Size[] }) {
  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.id.toString()}
    />
  );
}
