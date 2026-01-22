"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { useQuery } from "@connectrpc/connect-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { FilesystemService } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import FilesystemLayoutInfo from "./filesystem-layout-info";

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
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {id}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Size detail</DrawerTitle>
          <DrawerDescription>
            <span className="text-primary">{id}</span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {isLoading && <Skeleton className="h-12" />}
          {error && (
            <AlertHint title="Error loading size" description={error.message} />
          )}
          {!error && data && data.filesystemLayout && (
            <FilesystemLayoutInfo data={data.filesystemLayout} />
          )}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
