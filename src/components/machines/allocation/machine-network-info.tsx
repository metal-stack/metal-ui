import { InfoGrid } from "@/components/info-grid/info-grid";
import { MachineNetwork } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import {
  NATType,
  NetworkType,
} from "@metal-stack/api/js/metalstack/api/v2/network_pb";

interface MachineNetworkInfoProps {
  data: MachineNetwork;
}

export default function MachineNetworkInfo({ data }: MachineNetworkInfoProps) {
  const rows: Array<{ label: string; value: string | number | undefined }> = [
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
    { label: "VRF:", value: data.vrf !== undefined ? data.vrf.toString() : undefined },
    { label: "ASN:", value: data.asn !== undefined ? data.asn.toString() : undefined },
  ];

  if (data.project) {
    rows.push({ label: "Project:", value: data.project });
  }

  return <InfoGrid rows={rows} />;
}
