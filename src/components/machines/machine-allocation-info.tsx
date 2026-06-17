import {
  MachineAllocation,
  MachineAllocationType,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { Badge } from "@/components/ui/badge";
import ImageInfo from "../images/image-info";
import InfoCollapsible from "../info-collapsible/info-collapsible";
import FilesystemLayoutInfo from "../filesystem/filesystem-layout-info";
import FirewallRulesInfo from "./allocation/firewall/firewall-rules-info";
import MachineNetworkInfo from "./allocation/machine-network-info";
import { InfoGrid } from "../info-grid/info-grid";
import MachineVPNInfo from "./allocation/machine-vpn-info";
import { formatDate } from "@/lib/date-formatting";

interface MachineAllocationInfoProps {
  data: MachineAllocation;
}

export default function MachineAllocationInfo({
  data,
}: MachineAllocationInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "UUID:", value: data.uuid },
        { label: "Name:", value: data.name },
        { label: "Description:", value: data.description },
        { label: "Project:", value: data.project },
        { label: "Created by:", value: data.createdBy },
        { label: "Hostname:", value: data.hostname },
        {
          label: "Allocation type:",
          value: MachineAllocationType[data.allocationType],
        },

        {
          label: "Image",
          value: (
            <InfoCollapsible title="Image">
              {data.image && <ImageInfo data={data.image} />}
            </InfoCollapsible>
          ),
          fullWidth: true,
        },
        {
          label: "Filesystem layout",
          value: (
            <InfoCollapsible title="Filesystem layout">
              {data.filesystemLayout && (
                <FilesystemLayoutInfo data={data.filesystemLayout} />
              )}
            </InfoCollapsible>
          ),
          fullWidth: true,
        },
        {
          label: "Firewall rules",
          value: (
            <InfoCollapsible title="Firewall rules">
              {data.firewallRules && (
                <FirewallRulesInfo data={data.firewallRules} />
              )}
            </InfoCollapsible>
          ),
          fullWidth: true,
        },

        {
          label: "Networks",
          value: (
            <div className="ml-4">
              {data.networks.map((mn, index) => (
                <InfoCollapsible key={index} title="Network">
                  <MachineNetworkInfo data={mn} />
                </InfoCollapsible>
              ))}
            </div>
          ),
          fullWidth: true,
        },

        {
          label: "DNS server:",
          value: data.dnsServers.map((dns) => dns.ip).join(", "),
        },
        {
          label: "NTP server:",
          value: data.ntpServers.map((ntp) => ntp.address).join(", "),
        },
        {
          label: "VPN",
          value: (
            <InfoCollapsible title="VPN">
              {data.vpn && <MachineVPNInfo data={data.vpn} />}
            </InfoCollapsible>
          ),
          fullWidth: true,
        },

        // SSH Public Keys
        {
          label: "SSH Public Keys:",
          value:
            data.sshPublicKeys.filter((k) => k !== "").length > 0
              ? data.sshPublicKeys
                  .map((k, i) =>
                    k !== "" ? (
                      <div key={i} className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded break-all">
                          {k}
                        </code>
                      </div>
                    ) : null
                  )
                  .filter(Boolean)
              : "—",
          fullWidth: true,
        },

        // Allocation-level Meta
        {
          label: "Labels:",
          value: (() => {
            const metaLabels =
              data.meta?.labels?.labels ??
              (data.meta?.labels as Record<string, string> | undefined);
            if (!metaLabels || Object.keys(metaLabels).length === 0) {
              return "—";
            }
            return (
              <div className="flex flex-wrap gap-1">
                {Object.entries(metaLabels).map(([k, v]) => (
                  <span
                    key={k}
                    className="text-xs bg-muted px-1.5 py-0.5 rounded"
                  >
                    {k}: {v}
                  </span>
                ))}
              </div>
            );
          })(),
          fullWidth: true,
        },
        {
          label: "Created:",
          value: data.meta?.createdAt
            ? <Badge variant="secondary">{formatDate(timestampDate(data.meta.createdAt))}</Badge>
            : "—",
        },
        {
          label: "Updated:",
          value: data.meta?.updatedAt
            ? <Badge variant="secondary">{formatDate(timestampDate(data.meta.updatedAt))}</Badge>
            : "—",
        },
        {
          label: "Generation:",
          value: data.meta?.generation ? data.meta.generation.toString() : "—",
        },
        {
          label: "Deletion_task_ID:",
          value: data.meta?.deletionTaskId || "—",
        },
      ]}
    />
  );
}
