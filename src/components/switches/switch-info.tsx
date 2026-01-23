import {
  MachineConnection,
  Switch,
} from "@metal-stack/api/js/metalstack/api/v2/switch_pb";
import SwitchReplaceModeBadge from "./switch-replace-mode";
import SwitchOSBadge from "./switch-os-badge";
import { DataTable } from "../ui/data-table/data-table";
import SwitchConnectedMachinesInfo, {
  SwitchPortState,
} from "./switch-connected-machines";
import { ColumnDef } from "node_modules/@tanstack/table-core/build/lib/types";

interface SwitchInfoProps {
  data: Switch;
}

export default function SwitchInfo({ data }: SwitchInfoProps) {
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
      header: "NIC Identifier",
    },
    {
      accessorKey: "nic.vrf",
      header: "NIC VRF",
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
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>ID:</strong> {data.id}
      </div>
      <div>
        <strong>Description:</strong> {data.description}
      </div>
      <div>
        <strong>Partition:</strong> {data.partition}
      </div>
      <div>
        <strong>Rack:</strong> {data.rack}
      </div>
      <div>
        <strong>Replace mode:</strong>{" "}
        <SwitchReplaceModeBadge mode={data.replaceMode} />
      </div>
      <div>
        <strong>Mgmt IP:</strong> {data.managementIp}
      </div>
      <div>
        <strong>Mgmt User:</strong> {data.managementUser}
      </div>
      <div>
        <strong>OS:</strong> <SwitchOSBadge os={data.os} />
      </div>
      <div className="flex flex-col">
        <strong>Connected Machines:</strong>
        <SwitchConnectedMachinesInfo
          connectedMachines={data.machineConnections}
        />
      </div>
    </div>
  );
}
