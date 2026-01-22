"use client";

import { useQuery } from "@connectrpc/connect-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { ImageService } from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import ImageInfo from "./image-info";
import InfoDrawer from "../info-drawer/info-drawer";

interface ImageDrawerProps {
  id: string;
}

export default function ImageDrawer({ id }: ImageDrawerProps) {
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useQuery(
    ImageService.method.get,
    { id },
    { enabled: open },
  );

  return (
    <InfoDrawer id={id} open={open} onOpenChange={setOpen} title="Image detail">
      {isLoading && <Skeleton className="h-12" />}
      {error && (
        <AlertHint title="Error loading image" description={error.message} />
      )}
      {!error && data && data.image && <ImageInfo data={data.image} />}
    </InfoDrawer>
  );
}
