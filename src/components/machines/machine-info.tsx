import { Machine } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import InfoCollapsible from "../info-collapsible/info-collapsible";
import MachineAllocationInfo from "./machine-allocation-info";
import SizeInfo from "../sizes/size-info";
import MachineHardwareInfo from "./machine-hardware-info";
import MachineStatusInfo from "./machine-status-info";
import MachineEventsInfo from "./machine-events-info";

interface MachineInfoProps {
  data: Machine;
}

export default function MachineInfo({ data }: MachineInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>Partition:</strong> {data.partition?.id || "-"}
      </div>
      <div>
        <strong>Rack:</strong> {data.rack}
      </div>
      <InfoCollapsible title="Size">
        {data.size && <SizeInfo data={data.size} />}
      </InfoCollapsible>
      <InfoCollapsible title="Allocation">
        {data.allocation && <MachineAllocationInfo data={data.allocation} />}
      </InfoCollapsible>
      <InfoCollapsible title="Hardware">
        {data.hardware && <MachineHardwareInfo data={data.hardware} />}
      </InfoCollapsible>
      {/*<InfoCollapsible title="Bios">
        {data.bios && <MachineBiosInfo data={data.bios} />}
      </InfoCollapsible>*/}
      <InfoCollapsible title="Status">
        {data.status && <MachineStatusInfo data={data.status} />}
      </InfoCollapsible>
      <InfoCollapsible title="Events">
        {data.recentProvisioningEvents && (
          <MachineEventsInfo data={data.recentProvisioningEvents} />
        )}
      </InfoCollapsible>
    </div>
  );
}
