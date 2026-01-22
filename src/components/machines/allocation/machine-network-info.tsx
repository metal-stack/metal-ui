import { MachineNetwork } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import {
  NATType,
  NetworkType,
} from "@metal-stack/api/js/metalstack/api/v2/network_pb";

interface MachineNetworkInfoProps {
  data: MachineNetwork;
}

export default function MachineNetworkInfo({ data }: MachineNetworkInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>Network:</strong> {data.network}
      </div>
      <div>
        <strong>Network type:</strong> {NetworkType[data.networkType]}
      </div>
      <div>
        <strong>Prefixes:</strong> {data.prefixes.join(", ")}
      </div>
      <div>
        <strong>Destination prefixes:</strong>{" "}
        {data.destinationPrefixes.join(", ")}
      </div>
      <div>
        <strong>IPs:</strong> {data.ips.join(", ")}
      </div>
      <div>
        <strong>NAT type:</strong> {NATType[data.natType]}
      </div>
      <div>
        <strong>VRF:</strong> {data.vrf}
      </div>
      <div>
        <strong>ASN:</strong> {data.asn}
      </div>
    </div>
  );
}
