import { Switch } from "@metal-stack/api/js/metalstack/api/v2/switch_pb";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import SwitchReplaceModeBadge from "./switch-replace-mode";
import SwitchOSBadge from "./switch-os-badge";
import SwitchConnectedMachinesInfo from "./switch-connected-machines";
import { InfoGrid } from "../info-grid/info-grid";
import { TimeStampPill } from "../ui/timeStamp-pill";

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
        {
          label: "Created at:",
          value: data.meta?.createdAt ? (
            <TimeStampPill date={timestampDate(data.meta.createdAt)} />
          ) : undefined,
        },
        {
          label: "Updated at:",
          value: data.meta?.updatedAt ? (
            <TimeStampPill date={timestampDate(data.meta.updatedAt)} />
          ) : undefined,
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
