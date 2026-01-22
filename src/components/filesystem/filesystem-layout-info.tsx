import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { useState } from "react";
import { CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import { FilesystemLayout } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import FilesystemInfo from "./filesystem-info";

interface FilesystemLayoutInfoProps {
  data?: FilesystemLayout;
  asCollapse?: boolean;
}

export default function FilesystemLayoutInfo({
  data,
  asCollapse,
}: FilesystemLayoutInfoProps) {
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
        <strong>Filesystems:</strong>
        {data?.filesystems && data.filesystems.length > 0 ? (
          <div className="ml-2">
            {data.filesystems.map((filesystem, index) => (
              <FilesystemInfo key={index} data={filesystem} asCollapse />
            ))}
          </div>
        ) : (
          "-"
        )}
      </div>
      {/* TODO: add all fields here */}
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
