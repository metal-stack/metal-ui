import { InfoGrid } from "@/components/info-grid/info-grid";
import { MachineVPN } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";

interface MachineVPNInfoProps {
  data: MachineVPN;
}

export default function MachineVPNInfo({ data }: MachineVPNInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "Control plane address:", value: data.controlPlaneAddress },
        {
          label: "Connected:",
          value: data.connected,
        },
        {
          label: "IPs:",
          value: data.ips.join(", "),
        },
        // TODO authKey?
      ]}
    />
  );
}
