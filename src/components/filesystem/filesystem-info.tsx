import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { useState } from "react";
import { CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Filesystem } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";

interface FilesystemInfoProps {
  data?: Filesystem;
  asCollapse?: boolean;
}

export default function FilesystemInfo({
  data,
  asCollapse,
}: FilesystemInfoProps) {
  const [open, setOpen] = useState(false);

  const content = (
    <div className="flex flex-col gap-2">
      <div>
        <strong>Name:</strong> {data?.name || "-"}
      </div>
      <div>
        <strong>Description:</strong> {data?.description || "-"}
      </div>
      <div>
        <strong>Path:</strong> {data?.path || "-"}
      </div>
      <div>
        <strong>Label:</strong> {data?.label || "-"}
      </div>
      <div className="flex flex-col">
        <strong>Mount options:</strong>
        {data?.mountOptions && data.mountOptions.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.mountOptions.map((option, index) => (
              <div key={index} className="ml-4 mb-2">
                {option}
              </div>
            ))}
          </ul>
        ) : (
          "-"
        )}
      </div>
      <div className="flex flex-col">
        <strong>Create options:</strong>
        {data?.createOptions && data.createOptions.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.createOptions.map((option, index) => (
              <div key={index} className="ml-4 mb-2">
                {option}
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
          <h4 className="text-sm font-semibold">Filesystem: </h4>
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
