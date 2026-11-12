import { Section } from "@/components/ui/section/section";
import { InfoGrid } from "@/components/info-grid/info-grid";
import { MachineVPN } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";

interface MachineVPNInfoProps {
  data: MachineVPN;
  title?: string;
}

export default function MachineVPNInfo({
  data,
  title = "Details",
}: MachineVPNInfoProps) {
  return (
    <Section title={title}>
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
    </Section>
  );
}
