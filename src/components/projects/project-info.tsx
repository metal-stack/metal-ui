import { Project } from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import { CopyIcon, FingerprintPattern } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { IdentityCard } from "@/components/identity-card/identity-card";
import { useState } from "react";
import { Link } from "react-router";

interface ProjectInfoProps {
  data: Project;
}

export default function ProjectInfo({ data }: ProjectInfoProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUuid = () => {
    navigator.clipboard.writeText(data.uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const header = (
    <>
      {/* UUID */}
      <div className="flex items-center gap-2 text-sm">
        <FingerprintPattern className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-muted-foreground">UUID:</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopyUuid}
              className="font-bold text-xs hover:underline flex items-center gap-1"
              aria-label="Copy UUID"
              title={data.uuid}
            >
              {data.uuid}
              <CopyIcon className="size-3" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="flex items-center gap-1">
              <span className="font-mono">{data.uuid}</span>
              {copied && <span className="text-green-600 ml-2">Copied!</span>}
            </div>
          </TooltipContent>
        </Tooltip>
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

      {/* Tenant */}
      {data.tenant && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Tenant:</span>
          <Link
            to={`/tenants/${data.tenant}`}
            className="text-primary hover:underline"
          >
            {data.tenant}
          </Link>
        </div>
      )}

      {/* Avatar URL */}
      {data.avatarUrl && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Avatar URL:</span>
          {data.avatarUrl.startsWith("http") ? (
            <a
              href={data.avatarUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              {data.avatarUrl}
            </a>
          ) : (
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded break-all">
              {data.avatarUrl}
            </code>
          )}
        </div>
      )}
    </>
  );

  return <IdentityCard header={header} meta={data.meta} />;
}
