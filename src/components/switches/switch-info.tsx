import { Switch } from "@metal-stack/api/js/metalstack/api/v2/switch_pb";
import { CopyIcon, FingerprintPattern } from "lucide-react";
import { IdentityCard } from "@/components/identity-card/identity-card";
import SwitchReplaceModeBadge from "./switch-replace-mode";
import SwitchOSBadge from "./switch-os-badge";
import SwitchConnectedMachinesInfo from "./switch-connected-machines";
import CollapsibleSection from "@/components/collapsible-section/collapsible-section";
import { Link } from "react-router";
import { toast } from "sonner";

interface SwitchInfoProps {
  data: Switch;
}

export default function SwitchInfo({ data }: SwitchInfoProps) {
  const handleCopyId = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Copied id");
  };

  const header = (
    <>
      {/* Switch ID */}
      <div className="flex items-center gap-2 text-sm">
        <FingerprintPattern className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-muted-foreground">Switch:</span>
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

      {/* Rack */}
      {data.rack && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Rack:</span>
          <span>{data.rack}</span>
        </div>
      )}

      {/* Replace mode */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Replace mode:</span>
        <SwitchReplaceModeBadge mode={data.replaceMode} />
      </div>

      {/* Mgmt IP */}
      {data.managementIp && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Mgmt IP:</span>
          <span>{data.managementIp}</span>
        </div>
      )}

      {/* Mgmt User */}
      {data.managementUser && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Mgmt User:</span>
          <span>{data.managementUser}</span>
        </div>
      )}

      {/* OS */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">OS:</span>
        <SwitchOSBadge os={data.os} />
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-4">
      <IdentityCard header={header} meta={data.meta} />

      {data.machineConnections && data.machineConnections.length > 0 && (
        <div className="flex flex-col gap-2">
          <CollapsibleSection title="Connected Machines">
            <SwitchConnectedMachinesInfo
              connectedMachines={data.machineConnections}
            />
          </CollapsibleSection>
        </div>
      )}
    </div>
  );
}
