import { Machine } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { CopyIcon, FingerprintPattern, HardDrive, Server } from "lucide-react";
import { IconMaximize } from "@tabler/icons-react";
import CollapsibleSection from "@/components/collapsible-section/collapsible-section";
import MachineAllocationInfo from "./machine-allocation-info";
import MachineHardwareInfo from "./machine-hardware-info";
import MachineStatusInfo from "./machine-status-info";
import MachineEventsInfo from "./machine-events-info";
import { IdentityCard } from "../identity-card/identity-card";
import { Link } from "react-router";
import { toast } from "sonner";

interface MachineInfoProps {
  data: Machine;
}

export default function MachineInfo({ data }: MachineInfoProps) {
  const handleCopyUUID = () => {
    navigator.clipboard.writeText(data.uuid);
    toast.success("Copied id");
  };

  const identityHeader = (
    <>
      {/* UUID */}
      <div className="flex items-center gap-2 text-sm">
        <FingerprintPattern className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-muted-foreground">UUID:</span>
        <button
          onClick={handleCopyUUID}
          className="font-mono text-xs flex items-center gap-1"
          aria-label="Copy UUID"
          title={data.uuid}
        >
          {data.uuid}
          <CopyIcon className="size-3" />
        </button>
      </div>

      {/* Rack */}
      {data.rack && (
        <div className="flex items-center gap-2 text-sm">
          <HardDrive className="size-4 shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">Rack:</span>
          <span>{data.rack}</span>
        </div>
      )}

      {/* Partition */}
      {data.partition && (
        <div className="flex items-center gap-2 text-sm">
          <Server className="size-4 shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">Partition:</span>
          <Link
            to={`/partitions/${data.partition.id}`}
            className="font-semibold text-primary hover:underline"
          >
            {data.partition.id}
          </Link>
        </div>
      )}

      {/* Size */}
      {data.size && (
        <div className="flex items-center gap-2 text-sm">
          <IconMaximize className="size-4 shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">Size:</span>
          <Link
            to={`/sizes/${data.size.id}`}
            className="font-semibold text-primary hover:underline"
          >
            {data.size.id}
          </Link>
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col gap-3">
      <IdentityCard header={identityHeader} meta={data.meta} />

      {/* Allocation */}
      <CollapsibleSection title="Allocation">
        {data.allocation && <MachineAllocationInfo data={data.allocation} />}
      </CollapsibleSection>

      {/* Hardware */}
      <CollapsibleSection title="Hardware">
        {data.hardware && <MachineHardwareInfo data={data.hardware} />}
      </CollapsibleSection>

      {/* Status */}
      <CollapsibleSection title="Status">
        {data.status && <MachineStatusInfo data={data.status} />}
      </CollapsibleSection>

      {/* Events */}
      <CollapsibleSection title="Events">
        {data.recentProvisioningEvents && (
          <MachineEventsInfo data={data.recentProvisioningEvents} />
        )}
      </CollapsibleSection>
    </div>
  );
}
