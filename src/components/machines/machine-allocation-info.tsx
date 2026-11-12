import { Section } from "@/components/ui/section/section";
import {
  MachineAllocation,
  MachineAllocationType,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import ImageInfo from "../images/image-info";
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
    <>
      <Section title="Allocation">
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
              label: "DNS server:",
              value: data.dnsServer.map((dns) => dns.ip).join(", "),
            },
            {
              label: "NTP server:",
              value: data.ntpServer.map((ntp) => ntp.address).join(", "),
            },
          ]}
        />
      </Section>
      {data.vpn && <MachineVPNInfo data={data.vpn} title="VPN" />}
      {data.image && <ImageInfo data={data.image} title="Image" />}
      {data.filesystemLayout && (
        <FilesystemLayoutInfo
          data={data.filesystemLayout}
          title="Filesystem layout"
        />
      )}
      {data.firewallRules && <FirewallRulesInfo data={data.firewallRules} />}
      {data.networks.map((mn, index) => (
        <MachineNetworkInfo
          key={index}
          data={mn}
          title={"Network " + mn.network}
        />
      ))}
    </>
  );
}
