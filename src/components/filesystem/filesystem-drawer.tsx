"use client";

import { useQuery } from "@connectrpc/connect-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { FilesystemService } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import FilesystemLayoutInfo from "./filesystem-layout-info";
import InfoDrawer from "../info-drawer/info-drawer";

interface FilesystemDrawerProps {
  id: string;
}

export default function FilesystemDrawer({ id }: FilesystemDrawerProps) {
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useQuery(
    FilesystemService.method.get,
    { id },
    { enabled: open },
  );

  return (
    <InfoDrawer
      id={id}
      open={open}
      onOpenChange={setOpen}
      title="Filesystem detail"
    >
      {isLoading && <Skeleton className="h-12" />}
      {error && (
        <AlertHint
          title="Error loading filesystem"
          description={error.message}
        />
      )}
      {!error && data && data.filesystemLayout && (
        <FilesystemLayoutInfo data={data.filesystemLayout} />
      )}
    </InfoDrawer>
  );
}
