import {
  Size,
  SizeConstraintType,
} from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { useState } from "react";
import { CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";

interface SizeInfoProps {
  data?: Size;
  asCollapse?: boolean;
}

export default function SizeInfo({ data, asCollapse }: SizeInfoProps) {
  const [open, setOpen] = useState(false);

  const content = (
    <div className="flex flex-col gap-2">
      <div>
        <strong>ID:</strong> {data?.id || "-"}
      </div>
      <div>
        <strong>Name:</strong> {data?.name || "-"}
      </div>
      <div>
        <strong>Description:</strong> {data?.description || "-"}
      </div>
      <div className="flex flex-col">
        <strong>Constraints:</strong>
        {data?.constraints && data.constraints.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.constraints.map((constraint, index) => (
              <div key={index} className="ml-4 mb-2">
                <div>Type: {SizeConstraintType[constraint.type]}</div>
                <div>Min: {constraint.min}</div>
                <div>Max: {constraint.max}</div>
                <div>Identifier: {constraint.identifier || "-"}</div>
              </div>
            ))}
          </ul>
        ) : (
          "-"
        )}
      </div>
    </div>
  );

  if (asCollapse) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-sm font-semibold">Size: </h4>
          {data ? (
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronsUpDown />
              </Button>
            </CollapsibleTrigger>
          ) : (
            "-"
          )}
        </div>
        <CollapsibleContent className="border border-border rounded-md p-4">
          {content}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return content;
}
