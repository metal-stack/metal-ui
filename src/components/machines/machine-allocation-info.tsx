import {
  MachineAllocation,
  MachineAllocationType,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import ImageInfo from "../images/image-info";
import InfoCollapsible from "../info-collapsible/info-collapsible";
import FilesystemLayoutInfo from "../filesystem/filesystem-layout-info";
import FirewallRulesInfo from "./allocation/firewall/firewall-rules-info";
import MachineNetworkInfo from "./allocation/machine-network-info";

interface MachineAllocationInfoProps {
  data: MachineAllocation;
}

export default function MachineAllocationInfo({
  data,
}: MachineAllocationInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>UUID:</strong> {data.uuid}
      </div>
      <div>
        <strong>Name:</strong> {data.name}
      </div>
      <div>
        <strong>Description:</strong> {data.description}
      </div>
      <div>
        <strong>Project:</strong> {data.project}
      </div>
      <div>
        <strong>Created by:</strong> {data.createdBy}
      </div>
      <div>
        <strong>Hostname:</strong> {data.hostname}
      </div>
      <div>
        <strong>Allocation type:</strong>{" "}
        {MachineAllocationType[data.allocationType]}
      </div>
      <InfoCollapsible title="Image">
        {data.image && <ImageInfo data={data.image} />}
      </InfoCollapsible>
      <InfoCollapsible title="Filesystem layout">
        {data.filesystemLayout && (
          <FilesystemLayoutInfo data={data.filesystemLayout} />
        )}
      </InfoCollapsible>
      <InfoCollapsible title="Firewall rules">
        {data.firewallRules && <FirewallRulesInfo data={data.firewallRules} />}
      </InfoCollapsible>
      <div className="flex flex-col">
        <strong>Networks:</strong>
        <div className="ml-4">
          {data.networks.map((mn, index) => (
            <InfoCollapsible key={index} title="Network">
              <MachineNetworkInfo data={mn} />
            </InfoCollapsible>
          ))}
        </div>
      </div>
      <div>
        <strong>DNS server:</strong>{" "}
        {data.dnsServer.map((dns) => dns.ip).join(", ")}
      </div>
      <div>
        <strong>NTP server:</strong>{" "}
        {data.ntpServer.map((ntp) => ntp.address).join(", ")}
      </div>
    </div>
  );
}
