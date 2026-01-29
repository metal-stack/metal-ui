import { Switch } from "@metal-stack/api/js/metalstack/api/v2/switch_pb";
import SwitchReplaceModeBadge from "./switch-replace-mode";
import SwitchOSBadge from "./switch-os-badge";
import SwitchConnectedMachinesInfo from "./switch-connected-machines";

interface SwitchInfoProps {
  data: Switch;
}

export default function SwitchInfo({ data }: SwitchInfoProps) {
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
