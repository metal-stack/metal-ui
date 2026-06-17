import { Machine } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { CopyIcon, FingerprintPattern, HardDrive, Server } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CollapsibleSection from "@/components/collapsible-section/collapsible-section";
import MachineAllocationInfo from "./machine-allocation-info";
import MachineHardwareInfo from "./machine-hardware-info";
import MachineStatusInfo from "./machine-status-info";
import MachineEventsInfo from "./machine-events-info";
import { formatDate } from "@/lib/date-formatting";
import { useState } from "react";
import { Link } from "react-router";
import { IconMaximize } from "@tabler/icons-react";

interface MachineInfoProps {
  data: Machine;
}

export default function MachineInfo({ data }: MachineInfoProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUUID = () => {
    navigator.clipboard.writeText(data.uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Helper: format labels from Labels type
  const renderLabels = (
    labels:
      | {
          [key: string]: string;
        }
      | undefined,
  ) => {
    if (!labels || Object.keys(labels).length === 0) {
      return "—";
    }
    return (
      <div className="flex flex-wrap gap-1">
        {Object.entries(labels).map(([key, value]) => (
          <Badge key={key} variant="secondary" className="text-xs">
            {key}: {value}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Machine Identity */}
      <Card>
        <CardContent className="space-y-3">
          {/* UUID */}
          <div className="flex items-center gap-2 text-sm">
            <FingerprintPattern className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground">UUID:</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleCopyUUID}
                  className="font-mono text-xs hover:underline flex items-center gap-1"
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
                  {copied && (
                    <span className="text-green-600 ml-2">Copied!</span>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
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

          {/* Meta (labels, dates, generation) */}
          {data.meta && (
            <>
              <div className="pt-2 border-t">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Meta
                </span>
              </div>

              {/* Labels */}
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <span>Labels:</span>
                </div>
                {renderLabels(data.meta.labels?.labels)}
              </div>

              {/* Timestamps */}
              {(data.meta.createdAt || data.meta.updatedAt) && (
                <div className="flex flex-wrap gap-2 text-xs">
                  {data.meta.createdAt && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-muted-foreground">Created:</span>
                      <Badge variant="secondary">
                        {formatDate(timestampDate(data.meta.createdAt))}
                      </Badge>
                    </div>
                  )}
                  {data.meta.updatedAt && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-muted-foreground">Updated:</span>
                      <Badge variant="secondary">
                        {formatDate(timestampDate(data.meta.updatedAt))}
                      </Badge>
                    </div>
                  )}
                </div>
              )}

              {/* Generation */}
              {data.meta.generation ? (
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-muted-foreground">Generation:</span>
                  <Badge variant="secondary">{data.meta.generation}</Badge>
                </div>
              ) : null}

              {/* Deletion Task ID */}
              {data.meta.deletionTaskId ? (
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-muted-foreground">
                    Deletion Task ID:
                  </span>
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    {data.meta.deletionTaskId}
                  </code>
                </div>
              ) : null}
            </>
          )}
        </CardContent>
      </Card>

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
