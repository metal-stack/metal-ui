import { Network } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import { CopyIcon, FingerprintPattern } from "lucide-react";
import { IdentityCard } from "@/components/identity-card/identity-card";
import { Link } from "react-router";
import { toast } from "sonner";

interface NetworkInfoProps {
  data: Network;
}

export default function NetworkInfo({ data }: NetworkInfoProps) {
  const handleCopyId = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Copied id");
  };

  const header = (
    <>
      {/* Network ID */}
      <div className="flex items-center gap-2 text-sm">
        <FingerprintPattern className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-muted-foreground">Network:</span>
        <button
          onClick={handleCopyId}
          className="font-bold text-xs flex items-center gap-1"
          aria-label="Copy ID"
          title={data.id}
        >
          {data.id}
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

      {/* Partition */}
      {data.partition && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Partition:</span>
          <Link
            to={`/partitions/${data.partition}`}
            className="text-primary hover:underline"
          >
            {data.partition}
          </Link>
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
