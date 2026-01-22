import { MachineAllocation } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import ImageInfo from "../images/image-info";
import InfoCollapsible from "../info-collapsible/info-collapsible";

interface MachineAllocationProps {
  data: MachineAllocation;
}

export default function MachineAllocationInfo({
  data,
}: MachineAllocationProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>UUID:</strong> {data?.uuid || "-"}
      </div>
      <div>
        <strong>Name:</strong> {data?.name || "-"}
      </div>
      <div>
        <strong>Description:</strong> {data?.description || "-"}
      </div>
      <div>
        <strong>Project:</strong> {data?.project || "-"}
      </div>
      <div>
        <strong>Created by:</strong> {data?.createdBy || "-"}
      </div>

      <InfoCollapsible title="Image">
        {data.image && <ImageInfo data={data?.image} />}
      </InfoCollapsible>
      {/* TODO: add remaining fields */}
    </div>
  );
}
