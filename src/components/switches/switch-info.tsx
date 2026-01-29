import { Switch } from "@metal-stack/api/js/metalstack/api/v2/switch_pb";
import SwitchReplaceModeBadge from "./switch-replace-mode";
import SwitchOSBadge from "./switch-os-badge";
import SwitchConnectedMachinesInfo from "./switch-connected-machines";
import { InfoGrid } from "../info-grid/info-grid";

interface SwitchInfoProps {
  data: Switch;
}

export default function SwitchInfo({ data }: SwitchInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "ID:", value: data.id },
        { label: "Description:", value: data.description },
        { label: "Partition:", value: data.partition },
        { label: "Rack:", value: data.rack },
        {
          label: "Replace mode:",
          value: <SwitchReplaceModeBadge mode={data.replaceMode} />,
        },
        { label: "Mgmt IP:", value: data.managementIp },
        { label: "Mgmt User:", value: data.managementUser },
        { label: "OS:", value: <SwitchOSBadge os={data.os} /> },
        {
          label: "Connected Machines:",
          value: (
            <SwitchConnectedMachinesInfo
              connectedMachines={data.machineConnections}
            />
          ),
          fullWidth: true,
        },
      ]}
    />
  );
}
