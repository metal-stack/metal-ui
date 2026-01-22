import { Partition } from "@metal-stack/api/js/metalstack/api/v2/partition_pb";

interface PartitionInfoProps {
  data: Partition;
}

export default function PartitionInfo({ data }: PartitionInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>ID:</strong> {data.id}
      </div>
      <div>
        <strong>Description:</strong> {data.description}
      </div>
      <div className="flex flex-col">
        <strong>DNS-Server:</strong>
        {data.dnsServer && data.dnsServer.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.dnsServer.map((dnsServer, index) => (
              <div key={index} className="ml-4 mb-2">
                <div>IP: {dnsServer.ip}</div>
              </div>
            ))}
          </ul>
        ) : undefined}
      </div>
      <div className="flex flex-col">
        <strong>NTP-Server:</strong>
        {data.ntpServer && data.ntpServer.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.ntpServer.map((ntpServer, index) => (
              <div key={index} className="ml-4 mb-2">
                <div>Address: {ntpServer.address}</div>
              </div>
            ))}
          </ul>
        ) : undefined}
      </div>
      <div className="flex flex-col">
        <strong>Mgmt-Services:</strong>
        {data.mgmtServiceAddresses && data.mgmtServiceAddresses.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.mgmtServiceAddresses.map((mgmtServiceAddress, index) => (
              <div key={index} className="ml-4 mb-2">
                <div>Address: {mgmtServiceAddress}</div>
              </div>
            ))}
          </ul>
        ) : undefined}
      </div>
    </div>
  );
}
