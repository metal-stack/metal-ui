import { Tenant } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { CopyIcon, FingerprintPattern } from "lucide-react";
import { IdentityCard } from "@/components/identity-card/identity-card";
import { toast } from "sonner";

interface TenantsInfoProps {
  data: Tenant;
}

export default function TenantInfo({ data }: TenantsInfoProps) {
  const handleCopyLogin = () => {
    navigator.clipboard.writeText(data.login);
    toast.success("Copied id");
  };

  const header = (
    <>
      {/* Login / ID */}
      <div className="flex items-center gap-2 text-sm">
        <FingerprintPattern className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-muted-foreground">Login:</span>
        <button
          onClick={handleCopyLogin}
          className="font-bold text-xs flex items-center gap-1"
          aria-label="Copy Login"
          title={data.login}
        >
          {data.login}
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

      {/* Email */}
      {data.email && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Email:</span>
          <span>{data.email}</span>
        </div>
      )}

      {/* Description */}
      {(data.description || "—") !== "—" && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Description:</span>
          <span>{data.description}</span>
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

      {/* Created by */}
      {data.createdBy && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Created by:</span>
          <span>{data.createdBy}</span>
        </div>
      )}
    </>
  );

  return <IdentityCard header={header} meta={data.meta} />;
}
