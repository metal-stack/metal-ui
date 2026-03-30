import { IP, IPType } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import { InfoGrid } from "../info-grid/info-grid";
import { Badge } from "../ui/badge";
import { timestampDate } from "@bufbuild/protobuf/wkt";

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
    <Badge variant="outline">
      {icon + (withLabel ? " " + IPType[type] : "")}
    </Badge>
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
      value: timestampDate(data.meta.createdAt).toLocaleString(),
    });
  }
  if (data.meta?.updatedAt) {
    metaFields.push({
      label: "Updated at:",
      value: timestampDate(data.meta.updatedAt).toLocaleString(),
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
          { label: "UUID:", value: data.uuid },
          { label: "IP:", value: data.ip },
          { label: "Name:", value: data.name },
          {
            label: "Description:",
            value: data.description || "—",
          },
          { label: "Project:", value: data.project },
          { label: "Network:", value: data.network },
          {
            label: "Type:",
            value: <IPTypeBadge type={data.type} withLabel={true} />,
          },
          { label: "Namespace:", value: data.namespace || "—" },
        ]}
      />
    </div>
  );
}
