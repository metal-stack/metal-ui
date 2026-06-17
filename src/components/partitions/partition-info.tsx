import { Partition } from "@metal-stack/api/js/metalstack/api/v2/partition_pb";
import { IdentityCard } from "../identity-card/identity-card";
import CollapsibleSection from "@/components/collapsible-section/collapsible-section";
import { CopyIcon, FingerprintPattern } from "lucide-react";
import { toast } from "sonner";

interface PartitionInfoProps {
  data: Partition;
}

export default function PartitionInfo({ data }: PartitionInfoProps) {
  const handleCopyId = () => {
    navigator.clipboard.writeText(data.id);
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
          title={data.id}
        >
          {data.id}
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
    </>
  );

  return (
    <div className="flex flex-col gap-3">
      <IdentityCard header={identityHeader} meta={data.meta} />

      {/* DNS-Server */}
      <CollapsibleSection title="DNS-Server">
        {data.dnsServers.length > 0 && (
          <div className="ml-4 flex flex-col gap-2">
            {data.dnsServers.map((server) => (
              <div key={server.ip}>IP: {server.ip}</div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* NTP-Server */}
      <CollapsibleSection title="NTP-Server">
        {data.ntpServers.length > 0 && (
          <div className="ml-4 flex flex-col gap-2">
            {data.ntpServers.map((server) => (
              <div key={server.address}>Address: {server.address}</div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Mgmt-Services */}
      <CollapsibleSection title="Mgmt-Services">
        {data.mgmtServiceAddresses.length > 0 && (
          <div className="ml-4 flex flex-col gap-2">
            {data.mgmtServiceAddresses.map((address, index) => (
              <div key={index}>Address: {address}</div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Boot Configuration */}
      {data.bootConfiguration && (
        <CollapsibleSection title="Boot Configuration">
          <div className="ml-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Image URL:</span>
              <span>{String(data.bootConfiguration.imageUrl)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Kernel URL:</span>
              <span>{data.bootConfiguration.kernelUrl}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Commandline args:</span>
              <code>{data.bootConfiguration.commandline}</code>
            </div>
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
}
