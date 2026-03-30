import { Partition } from "@metal-stack/api/js/metalstack/api/v2/partition_pb";
import { InfoGrid } from "../info-grid/info-grid";

interface PartitionInfoProps {
  data: Partition;
}

export default function PartitionInfo({ data }: PartitionInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "ID:", value: data.id },
        { label: "Description:", value: data.description },

        {
          label: "DNS-Server",
          value: (
            <div className="ml-4 flex flex-col gap-2">
              {data.dnsServers.map((dnsServer, index) => (
                <div key={index}>IP: {dnsServer.ip}</div>
              ))}
            </div>
          ),
          fullWidth: true,
        },

        {
          label: "NTP-Server",
          value: (
            <div className="ml-4 flex flex-col gap-2">
              {data.ntpServers.map((ntpServer, index) => (
                <div key={index}>Address: {ntpServer.address}</div>
              ))}
            </div>
          ),
          fullWidth: true,
        },

        {
          label: "Mgmt-Services",
          value: (
            <div className="ml-4 flex flex-col gap-2">
              {data.mgmtServiceAddresses.map((address, index) => (
                <div key={index}>Address: {address}</div>
              ))}
            </div>
          ),
          fullWidth: true,
        },
      ]}
    />
  );
}
