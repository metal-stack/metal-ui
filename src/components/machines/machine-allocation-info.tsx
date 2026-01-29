import {
  MachineAllocation,
  MachineAllocationType,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import ImageInfo from "../images/image-info";
import InfoCollapsible from "../info-collapsible/info-collapsible";
import FilesystemLayoutInfo from "../filesystem/filesystem-layout-info";
import FirewallRulesInfo from "./allocation/firewall/firewall-rules-info";
import MachineNetworkInfo from "./allocation/machine-network-info";
import { InfoGrid } from "../info-grid/info-grid";
import MachineVPNInfo from "./allocation/machine-vpn-info";

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
          value: data.dnsServer.map((dns) => dns.ip).join(", "),
        },
        {
          label: "NTP server:",
          value: data.ntpServer.map((ntp) => ntp.address).join(", "),
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
      ]}
    />
  );
}
