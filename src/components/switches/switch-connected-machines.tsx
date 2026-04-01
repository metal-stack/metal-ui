import { MachineConnection } from "@metal-stack/api/js/metalstack/api/v2/switch_pb";
import { DataTable } from "../ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { SwitchPortStatus } from "@metal-stack/api/js/metalstack/api/v2/switch_pb";

function SwitchPortState(state?: SwitchPortStatus) {
  let stateString = "";
  switch (state) {
    case SwitchPortStatus.DOWN:
      stateString = "🔴 Down";
      break;
    case SwitchPortStatus.UP:
      stateString = "🟢 Up";
      break;
    case SwitchPortStatus.UNKNOWN:
      stateString = "❓ Unknown";
      break;
    default:
      stateString = "❓ Unspecified";
  }

  return stateString;
}

interface SwitchConnectedMachinesInfoProps {
  connectedMachines: MachineConnection[];
}

const columns: ColumnDef<MachineConnection>[] = [
  {
    accessorKey: "machineId",
    header: "Machine ID",
  },
  {
    accessorKey: "nic.name",
    header: "NIC Name",
  },
  {
    accessorKey: "nic.identifier",
    header: "Identifier",
  },
  {
    accessorKey: "nic.vrf",
    header: "VRF",
  },
  {
    accessorKey: "actualPortStatus",
    header: "Actual Port Status",
    cell: ({ row }) => SwitchPortState(row.original.nic?.state?.actual),
  },
  {
    accessorKey: "desiredPortStatus",
    header: "Desired Port Status",
    cell: ({ row }) => SwitchPortState(row.original.nic?.state?.desired),
  },
];

export default function SwitchConnectedMachinesInfo({
  connectedMachines,
}: SwitchConnectedMachinesInfoProps) {
  return (
    <DataTable
      initialData={connectedMachines}
      columns={columns}
      getRowId={(row) => row.machineId}
    />
  );
}
