import { Section } from "@/components/ui/section/section";
import { InfoGrid } from "@/components/info-grid/info-grid";
import { MachineNetwork } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import {
  NATType,
  NetworkType,
} from "@metal-stack/api/js/metalstack/api/v2/network_pb";

interface MachineNetworkInfoProps {
  data: MachineNetwork;
  title?: string;
}

export default function MachineNetworkInfo({
  data,
  title = "Details",
}: MachineNetworkInfoProps) {
  return (
    <Section title={title}>
      <InfoGrid
        rows={[
          { label: "Network:", value: data.network },
          {
            label: "Network type:",
            value: NetworkType[data.networkType],
          },
          {
            label: "Prefixes:",
            value: data.prefixes.join(", "),
          },
          {
            label: "Destination prefixes:",
            value: data.destinationPrefixes.join(", "),
          },
          {
            label: "IPs:",
            value: data.ips.join(", "),
          },
          {
            label: "NAT type:",
            value: NATType[data.natType],
          },
          { label: "VRF:", value: data.vrf },
          { label: "ASN:", value: data.asn },
        ]}
      />
    </Section>
  );
}
