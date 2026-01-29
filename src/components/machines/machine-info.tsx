import { Machine } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import InfoCollapsible from "../info-collapsible/info-collapsible";
import MachineAllocationInfo from "./machine-allocation-info";
import SizeInfo from "../sizes/size-info";

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
    </div>
  );
}
