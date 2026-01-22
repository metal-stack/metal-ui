import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { useState } from "react";
import { CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import { MachineAllocation } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import ImageInfo from "../images/image-info";

interface MachineAllocationProps {
  data?: MachineAllocation;
  asCollapse?: boolean;
}

export default function MachineAllocationInfo({
  data,
  asCollapse,
}: MachineAllocationProps) {
  const [open, setOpen] = useState(false);

  const content = (
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
      <ImageInfo data={data?.image} asCollapse={true} />
      {/* TODO: add remaining fields */}
    </div>
  );

  if (asCollapse) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-sm font-semibold">Machine allocation: </h4>
          {data ? (
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronsUpDown />
              </Button>
            </CollapsibleTrigger>
          ) : (
            <Button variant="ghost" size="icon" className="size-8" disabled>
              -
            </Button>
          )}
        </div>
        <CollapsibleContent>{content}</CollapsibleContent>
      </Collapsible>
    );
  }

  return content;
}
