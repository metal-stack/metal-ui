import { IP, IPType } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import { InfoGrid } from "../info-grid/info-grid";
import { CopyableText } from "../ui/copyable-text";
import { BadgeStatus } from "../ui/status-pill";
import { TimestampPill } from "../ui/timestamp-pill";

interface IPInfoProps {
  data: IP;
}

export function IPTypeBadge({
  type,
  withLabel = false,
}: {
  type: IPType;
  withLabel?: boolean;
}) {
  let icon = "";
  switch (type) {
    case IPType.IP_TYPE_EPHEMERAL:
      icon = "🌐";
      break;
    case IPType.IP_TYPE_STATIC:
      icon = "📌";
      break;
    case IPType.IP_TYPE_UNSPECIFIED:
      icon = "❓";
      break;
  }

  return (
    <BadgeStatus
      status="pending"
      label={icon + (withLabel ? " " + IPType[type] : "")}
    />
  );
}

export default function IPInfo({ data }: IPInfoProps) {
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
          { label: "UUID:", value: <CopyableText text={data.uuid} variant="inline" /> },
          { label: "IP:", value: <CopyableText text={data.ip} variant="inline" /> },
          { label: "Name:", value: data.name },
          {
            label: "Description:",
            value: data.description || "—",
          },
          { label: "Project:", value: <CopyableText text={data.project} variant="inline" /> },
          { label: "Network:", value: <CopyableText text={data.network} variant="inline" /> },
          {
            label: "Type:",
            value: <IPTypeBadge type={data.type} withLabel={true} />,
          },
          { label: "Namespace:", value: data.namespace ? <CopyableText text={data.namespace} variant="inline" /> : "—" },
        ]}
      />
    </div>
  );
}
