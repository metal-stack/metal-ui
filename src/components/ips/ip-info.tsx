import { IP, IPType } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import { CopyIcon, FingerprintPattern, Globe, Pin } from "lucide-react";
import { Badge } from "../ui/badge";
import { IdentityCard } from "@/components/identity-card/identity-card";
import { Link } from "react-router";
import { toast } from "sonner";

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
  const label = IPType[type];

  if (type === IPType.IP_TYPE_EPHEMERAL) {
    return (
      <Badge variant="outline">
        <Globe className="size-3 text-blue-400" />
        {withLabel ? ` ${label}` : ""}
      </Badge>
    );
  }

  if (type === IPType.IP_TYPE_STATIC) {
    return (
      <Badge variant="outline">
        <Pin className="size-3 text-red-400" />
        {withLabel ? ` ${label}` : ""}
      </Badge>
    );
  }

  return <Badge variant="outline">{label}</Badge>;
}

export default function IPInfo({ data }: IPInfoProps) {
  const handleCopyIp = () => {
    navigator.clipboard.writeText(data.ip);
    toast.success("Coied id");
  };

  const header = (
    <>
      {/* IP */}
      <div className="flex items-center gap-2 text-sm">
        <FingerprintPattern className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-muted-foreground">IP:</span>
        <button
          onClick={handleCopyIp}
          className="font-bold text-xs flex items-center gap-1"
          aria-label="Copy IP"
          title={data.ip}
        >
          {data.ip}
          <CopyIcon className="size-3" />
        </button>
      </div>

      {/* Name */}
      {data.name && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Name:</span>
          <span>{data.name}</span>
        </div>
      )}

      {/* Description */}
      {data.description && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Description:</span>
          <span>{data.description}</span>
        </div>
      )}

      {/* Network */}
      {data.network && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Network:</span>
          <Link
            to={`/networks/${data.network}`}
            className="text-primary hover:underline"
          >
            {data.network}
          </Link>
        </div>
      )}

      {/* Project */}
      {data.project && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Project:</span>
          <Link
            to={`/projects/${data.project}`}
            className="text-primary hover:underline"
          >
            {data.project}
          </Link>
        </div>
      )}

      {/* Type */}
      {data.type !== IPType.IP_TYPE_UNSPECIFIED && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Type:</span>
          <IPTypeBadge type={data.type} withLabel={true} />
        </div>
      )}

      {/* Namespace */}
      {data.namespace && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Namespace:</span>
          <span>{data.namespace}</span>
        </div>
      )}
    </>
  );

  return <IdentityCard header={header} meta={data.meta} />;
}
