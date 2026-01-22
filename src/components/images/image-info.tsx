import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { useState } from "react";
import { CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Image,
  ImageClassification,
  ImageFeature,
} from "@metal-stack/api/js/metalstack/api/v2/image_pb";

interface ImageInfoProps {
  data?: Image;
  asCollapse?: boolean;
}

export default function ImageInfo({ data, asCollapse }: ImageInfoProps) {
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
      <div>
        <strong>URL:</strong> {data?.url || "-"}
      </div>
      <div>
        <strong>Image classification:</strong>
        {data?.classification ? ImageClassification[data?.classification] : "-"}
      </div>
      <div className="flex flex-col">
        <strong>Image features:</strong>
        {data?.features && data.features.length > 0 ? (
          <>
            {data.features.map((features, index) => (
              <div key={index}>{ImageFeature[features]}</div>
            ))}
          </>
        ) : (
          "-"
        )}
      </div>
    </div>
  );

  if (asCollapse) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between gap-4 px-4">
          <h4 className="text-sm font-semibold">Image: </h4>
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
        <CollapsibleContent>{content}</CollapsibleContent>
      </Collapsible>
    );
  }

  return content;
}
