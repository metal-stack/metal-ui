import {
  Service,
  ServiceStatus,
} from "@metal-stack/api/js/metalstack/api/v2/health_pb";
import { Badge, Group, Text } from "@mantine/core";

interface ServiceHealthItemProps {
  serviceName: Service;
  status: ServiceStatus;
  message?: string;
}

const statusColor: Partial<Record<ServiceStatus, string>> = {
  [ServiceStatus.HEALTHY]: "green",
  [ServiceStatus.UNHEALTHY]: "red",
  [ServiceStatus.DEGRADED]: "yellow",
};

export default function ServiceHealthItem({
  serviceName,
  status,
}: ServiceHealthItemProps) {
  const name = Service[serviceName].toLowerCase();
  return (
    <Group justify="space-between" mb="xs" wrap="nowrap">
      <Text fw={600}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
      <Badge color={statusColor[status] ?? "gray"}>{ServiceStatus[status]}</Badge>
    </Group>
  );
}
