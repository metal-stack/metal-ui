import {
  Network,
  NATType,
  NetworkType,
} from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import { InfoGrid } from "../info-grid/info-grid";
import { CopyableText } from "../ui/copyable-text";
import { TimestampPill } from "../ui/timestamp-pill";

interface NetworkInfoProps {
  data: Network;
}

function ChildPrefixLengthDisplay({
  label,
  prefixLength,
}: {
  label: string;
  prefixLength?: { ipv4?: number; ipv6?: number };
}) {
  if (!prefixLength) {
    return null;
  }

  const rows = [];
  if (prefixLength.ipv4 !== undefined) {
    rows.push({ label: `${label} IPv4:`, value: prefixLength.ipv4 });
  }
  if (prefixLength.ipv6 !== undefined) {
    rows.push({ label: `${label} IPv6:`, value: prefixLength.ipv6 });
  }

  return <InfoGrid rows={rows} />;
}

function NetworkConsumptionDisplay({ consumption }: { consumption?: any }) {
  if (!consumption) {
    return null;
  }

  const rows = [];

  if (consumption.ipv4) {
    rows.push({ label: "Available IPs:", value: consumption.ipv4.availableIps });
    rows.push({ label: "Used IPs:", value: consumption.ipv4.usedIps });
    rows.push({
      label: "Available Prefixes:",
      value: consumption.ipv4.availablePrefixes,
    });
    rows.push({ label: "Used Prefixes:", value: consumption.ipv4.usedPrefixes });
  }

  if (consumption.ipv6) {
    rows.push({ label: "Available IPs:", value: consumption.ipv6.availableIps });
    rows.push({ label: "Used IPs:", value: consumption.ipv6.usedIps });
    rows.push({
      label: "Available Prefixes:",
      value: consumption.ipv6.availablePrefixes,
    });
    rows.push({ label: "Used Prefixes:", value: consumption.ipv6.usedPrefixes });
  }

  if (!rows.length) {
    return null;
  }

  return (
    <div className="ml-4">
      <strong>Consumption:</strong>
      <InfoGrid rows={rows} />
    </div>
  );
}

export default function NetworkInfo({ data }: NetworkInfoProps) {
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

  const rows = [];
  rows.push({ label: "ID:", value: <CopyableText text={data.id} variant="inline" /> });
  rows.push({ label: "Name:", value: data.name || "—" });
  rows.push({ label: "Description:", value: data.description || "—" });
  rows.push({ label: "Project:", value: <CopyableText text={data.project || ""} variant="inline" /> });
  rows.push({ label: "Partition:", value: <CopyableText text={data.partition || ""} variant="inline" /> });
  rows.push({ label: "Namespace:", value: data.namespace ? <CopyableText text={data.namespace} variant="inline" /> : "—" });
  rows.push({
    label: "Prefixes:",
    value: data.prefixes?.join(", ") || "-",
    fullWidth: true,
  });
  rows.push({
    label: "Destination Prefixes:",
    value: data.destinationPrefixes?.join(", ") || "-",
    fullWidth: true,
  });
  if (data.defaultChildPrefixLength) {
    rows.push({
      label: "Default Child Prefix Length",
      value: (
        <ChildPrefixLengthDisplay
          label="Default"
          prefixLength={data.defaultChildPrefixLength}
        />
      ),
      fullWidth: true,
    });
  }
  if (data.minChildPrefixLength) {
    rows.push({
      label: "Minimal Child Prefix Length",
      value: (
        <ChildPrefixLengthDisplay
          label="Minimal"
          prefixLength={data.minChildPrefixLength}
        />
      ),
      fullWidth: true,
    });
  }
  rows.push({
    label: "Network Type:",
    value: data.type ? NetworkType[data.type] : "-",
  });
  rows.push({
    label: "NAT Type:",
    value: data.natType ? NATType[data.natType] : "-",
  });
  rows.push({ label: "VRF:", value: data.vrf !== undefined ? <CopyableText text={data.vrf.toString()} variant="inline" /> : "-" });
  rows.push({ label: "Parent Network:", value: data.parentNetwork ? <CopyableText text={data.parentNetwork} variant="inline" /> : "—" });
  rows.push({
    label: "Additional Announcable CIDRs:",
    value: data.additionalAnnouncableCidrs?.join(", ") || "-",
    fullWidth: true,
  });
  if (data.consumption) {
    rows.push({
      label: "Consumption",
      value: <NetworkConsumptionDisplay consumption={data.consumption} />,
      fullWidth: true,
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <InfoGrid rows={metaFields} />
      <InfoGrid rows={rows} />
    </div>
  );
}
