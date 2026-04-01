import {
  MachineAllocation,
  MachineAllocationType,
} from"@metal-stack/api/js/metalstack/api/v2/machine_pb";
import ImageInfo from "../images/image-info";
import InfoCollapsible from "../info-collapsible/info-collapsible";
import FilesystemLayoutInfo from "../filesystem/filesystem-layout-info";
import FirewallRulesInfo from "./allocation/firewall/firewall-rules-info";
import MachineNetworkInfo from "./allocation/machine-network-info";
import { InfoGrid } from "../info-grid/info-grid";
import MachineVPNInfo from "./allocation/machine-vpn-info";
import { CopyableText } from "../ui/copyable-text";
import { TimestampPill } from "../ui/timestamp-pill";

interface MachineAllocationInfoProps {
  data: MachineAllocation;
}

export default function MachineAllocationInfo({
  data,
}: MachineAllocationInfoProps) {
  const metaFields = [];
  if (data.meta?.labels?.labels) {
    const labels = Object.entries(data.meta.labels.labels).map(
      ([key, value]) => `${key}=${value}`
    );
    metaFields.push({ label: "Labels:", value: labels.join(", ") });
  }
  if (data.meta?.createdAt) {
    metaFields.push({
      label: "Created at:",
      value: <TimestampPill timestamp={data.meta.createdAt} />,
    });
  }
  if (data.meta?.updatedAt) {
    metaFields.push({
      label: "Updated at:",
      value: <TimestampPill timestamp={data.meta.updatedAt} />,
    });
  }
  if (data.meta?.generation !== undefined) {
    metaFields.push({ label: "Generation:", value: data.meta.generation });
  }

  return (
    <InfoGrid
      rows={[
        { label: "UUID:", value: <CopyableText text={data.uuid} variant="inline" /> },
        { label: "Name:", value: data.name },
        { label: "Description:", value: data.description },
        { label: "Project:", value: <CopyableText text={data.project} variant="inline" /> },
        { label: "Created by:", value: <CopyableText text={data.createdBy} variant="inline" /> },
        { label: "Hostname:", value: data.hostname },
        {
          label: "Allocation type:",
          value: MachineAllocationType[data.allocationType],
        },
        ...metaFields,

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
        {
          label: "SSH public keys:",
          value: data.sshPublicKeys.length
            ? data.sshPublicKeys.map((key, index) => (
                <div key={index} className="ml-4">
                  <CopyableText text={key} variant="block" />
                </div>
              ))
            : "-",
          fullWidth: true,
        },
        {
          label: "Userdata:",
          value: data.userdata ? (
            <div className="ml-4">
              <CopyableText text={data.userdata} variant="block" />
            </div>
          ) : "-",
          fullWidth: true,
        },
      ]}
    />
  );
}
