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
  const rows: Array<{ label: string; value: React.ReactNode }> = [
    { label: "Network:", value: <span className="font-mono">{data.network}</span> },
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
    { label: "VRF:", value: data.vrf !== undefined ? <span className="font-mono">{data.vrf.toString()}</span> : "—" },
    { label: "ASN:", value: data.asn !== undefined ? <span className="font-mono">{data.asn.toString()}</span> : "—" },
  ];

  if (data.project) {
    rows.push({ label: "Project:", value: <span className="font-mono">{data.project}</span> });
  }

  return <InfoGrid rows={rows} />;
}
