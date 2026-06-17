import {
  Token,
  TokenType,
} from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import CodeBlock from "../code-block/code-block";
import { Badge } from "../ui/badge";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { toast } from "sonner";
import { Bot, CopyIcon, FingerprintPattern, User } from "lucide-react";
import { IdentityCard } from "../identity-card/identity-card";
import CollapsibleSection from "../collapsible-section/collapsible-section";
import { formatDate } from "@/lib/date-formatting";

interface TokenInfoProps {
  data: Token;
}

export function TokenTypeBadge({
  type,
  withLabel = false,
}: {
  type: TokenType;
  withLabel?: boolean;
}) {
  const label = TokenType[type];

  if (type === TokenType.API) {
    return (
      <Badge variant="outline">
        <Bot className="size-3 text-blue-400" />
        {withLabel ? ` ${label}` : ""}
      </Badge>
    );
  }

  if (type === TokenType.USER) {
    return (
      <Badge variant="outline">
        <User className="size-3 text-red-400" />
        {withLabel ? ` ${label}` : ""}
      </Badge>
    );
  }

  return <Badge variant="outline">{label}</Badge>;
}

export default function TokenInfo({ data }: TokenInfoProps) {
  const handleCopyId = () => {
    navigator.clipboard.writeText(data.uuid);
    toast.success("Copied id");
  };

  const identityHeader = (
    <>
      {/* ID */}
      <div className="flex items-center gap-2 text-sm">
        <FingerprintPattern className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-muted-foreground">Id:</span>
        <button
          onClick={handleCopyId}
          className="font-bold text-xs flex items-center gap-1"
          aria-label="Copy ID"
          title={data.uuid}
        >
          {data.uuid}
          <CopyIcon className="size-3" />
        </button>
      </div>
      {/* Description */}
      {data.description && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Description:</span>
          <span>{data.description}</span>
        </div>
      )}

      {/* Issued at*/}
      {data.tokenType && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Token type:</span>
          <TokenTypeBadge type={data.tokenType} withLabel />
        </div>
      )}

      {/* Issued at*/}
      {data.issuedAt && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Issued at:</span>
          <Badge variant="secondary">
            {formatDate(timestampDate(data.issuedAt))}
          </Badge>
        </div>
      )}

      {/* Expiration */}
      {data.expires && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Expires at:</span>
          <Badge variant="secondary">
            {formatDate(timestampDate(data.expires))}
          </Badge>
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col gap-3">
      <IdentityCard header={identityHeader} meta={data.meta} />

      {/* Filesystems */}
      <CollapsibleSection title="Token scope">
        <CodeBlock
          title="Permissions"
          data={{
            ...data.permissions,
            ...data.projectRoles,
            ...data.tenantRoles,
            adminRole: data.adminRole,
            infraRole: data.infraRole,
          }}
        />
      </CollapsibleSection>
    </div>
  );
}
