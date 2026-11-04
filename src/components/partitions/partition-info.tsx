import { Stack } from "@mantine/core";
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
            <Stack gap="xs" ml="md">
              {data.dnsServer.map((dnsServer, index) => (
                <div key={index}>IP: {dnsServer.ip}</div>
              ))}
            </Stack>
          ),
          fullWidth: true,
        },

        {
          label: "NTP-Server",
          value: (
            <Stack gap="xs" ml="md">
              {data.ntpServer.map((ntpServer, index) => (
                <div key={index}>Address: {ntpServer.address}</div>
              ))}
            </Stack>
          ),
          fullWidth: true,
        },

        {
          label: "Mgmt-Services",
          value: (
            <Stack gap="xs" ml="md">
              {data.mgmtServiceAddresses.map((address, index) => (
                <div key={index}>Address: {address}</div>
              ))}
            </Stack>
          ),
          fullWidth: true,
        },
      ]}
    />
  );
}
