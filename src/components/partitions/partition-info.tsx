import {
  Partition,
  PartitionBootConfiguration,
} from "@metal-stack/api/js/metalstack/api/v2/partition_pb";
import { InfoGrid } from "../info-grid/info-grid";
import { TimestampPill } from "../ui/timestamp-pill";

interface PartitionInfoProps {
  data: Partition;
}

function PartitionBootConfigurationDisplay({
  bootConfig,
}: {
  bootConfig?: PartitionBootConfiguration;
}) {
  if (!bootConfig) {
    return null;
  }

  return (
    <div className="ml-4">
      <InfoGrid
        rows={[
          { label: "Image URL:", value: bootConfig.imageUrl || "—" },
          { label: "Kernel URL:", value: bootConfig.kernelUrl || "—" },
          { label: "Commandline:", value: bootConfig.commandline || "—" },
        ]}
      />
    </div>
  );
}

function DNSServerDisplay({ servers }: { servers?: any[] }) {
  if (!servers || !servers.length) {
    return "-";
  }

  return (
    <div className="ml-4">
      {servers.map((server, index) => (
        <div key={index}>IP: {server.ip}</div>
      ))}
    </div>
  );
}

function NTPServerDisplay({ servers }: { servers?: any[] }) {
  if (!servers || !servers.length) {
    return "-";
  }

  return (
    <div className="ml-4">
      {servers.map((server, index) => (
        <div key={index}>Address: {server.address}</div>
      ))}
    </div>
  );
}

export default function PartitionInfo({ data }: PartitionInfoProps) {
  const metaFields = [];
  if (data.meta?.labels?.labels) {
    const labels = Object.entries(data.meta.labels.labels).map(
      ([key, value]) => `${key}=${value}`
    );
    metaFields.push({ label: "Labels:", value: labels.join(", ") });
  }
  if (data.meta?.createdAt) {
    metaFields.push({
      label: "Created at:",
      value: <TimestampPill timestamp={data.meta.createdAt} />,
    });
  }
  if (data.meta?.updatedAt) {
    metaFields.push({
      label: "Updated at:",
      value: <TimestampPill timestamp={data.meta.updatedAt} />,
    });
  }
  if (data.meta?.generation !== undefined) {
    metaFields.push({ label: "Generation:", value: data.meta.generation });
  }

  return (
    <div className="flex flex-col gap-2">
      <InfoGrid rows={metaFields} />
      <InfoGrid
        rows={[
          { label: "ID:", value: data.id },
          { label: "Description:", value: data.description || "—" },
          {
            label: "Boot Configuration",
            value: <PartitionBootConfigurationDisplay bootConfig={data.bootConfiguration} />,
            fullWidth: true,
          },
          {
            label: "DNS Servers",
            value: <DNSServerDisplay servers={data.dnsServers} />,
            fullWidth: true,
          },
          {
            label: "NTP Servers",
            value: <NTPServerDisplay servers={data.ntpServers} />,
            fullWidth: true,
          },
          {
            label: "Management Service Addresses",
            value: (
              <div className="ml-4">
                {data.mgmtServiceAddresses.map((address, index) => (
                  <div key={index}>Address: {address}</div>
                ))}
              </div>
            ),
            fullWidth: true,
          },
        ]}
      />
    </div>
  );
}
