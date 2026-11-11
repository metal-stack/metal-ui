import { Section } from "@/components/ui/section/section";
import { Badge, Group } from "@mantine/core";
import { Partition } from "@metal-stack/api/js/metalstack/api/v2/partition_pb";
import { InfoGrid } from "../info-grid/info-grid";

interface PartitionInfoProps {
  data: Partition;
}

function Badges({ items }: { items: string[] }) {
  if (!items.length) return undefined;
  return (
    <Group gap="xs">
      {items.map((item) => (
        <Badge key={item} variant="light" tt="none">
          {item}
        </Badge>
      ))}
    </Group>
  );
}

export default function PartitionInfo({ data }: PartitionInfoProps) {
  return (
    <>
      <Section title="Details">
        <InfoGrid
          rows={[
            { label: "ID:", value: data.id },
            { label: "Description:", value: data.description },
          ]}
        />
      </Section>
      <Section title="Services">
        <InfoGrid
          rows={[
            {
              label: "DNS servers:",
              value: <Badges items={data.dnsServer.map((d) => d.ip)} />,
            },
            {
              label: "NTP servers:",
              value: <Badges items={data.ntpServer.map((n) => n.address)} />,
            },
            {
              label: "Mgmt services:",
              value: <Badges items={data.mgmtServiceAddresses} />,
            },
          ]}
        />
      </Section>
    </>
  );
}
