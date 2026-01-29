import { IP, IPType } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import { InfoGrid } from "../info-grid/info-grid";
import { Badge } from "../ui/badge";

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
  return (
    <InfoGrid
      rows={[
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
        { label: "Namespace:", value: data.namespace },
      ]}
    />
  );
}
