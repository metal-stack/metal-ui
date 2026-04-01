import { Partition } from "@metal-stack/api/js/metalstack/api/v2/partition_pb";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { InfoGrid } from "../info-grid/info-grid";
import { TimeStampPill } from "../ui/timeStamp-pill";

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
        {
          label: "DNS-Server",
          value: (
            <div className="ml-4 flex flex-col gap-2">
              {data.dnsServer.map((dnsServer, index) => (
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
              {data.ntpServer.map((ntpServer, index) => (
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
