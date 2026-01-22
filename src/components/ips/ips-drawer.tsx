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
import { IPService, IPType } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";

interface IPDrawerProps {
  id: string;
  ip: string;
  project: string;
}

export default function IPDrawer({ id, ip, project }: IPDrawerProps) {
  const [open, setOpen] = useState(false);
  // ip-admin service has no get -> use api
  const { data, isLoading, error } = useQuery(
    IPService.method.get,
    {
      ip: ip,
      project: project,
    },
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
          <DrawerTitle>IP detail</DrawerTitle>
          <DrawerDescription>
            <span className="text-primary">{id}</span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {isLoading && <Skeleton className="h-12" />}
          {error && (
            <AlertHint title="Error loading IP" description={error.message} />
          )}
          {!error && data && data.ip && (
            <div className="flex flex-col gap-2">
              <div>
                <strong>IP:</strong> {data.ip.ip}
              </div>
              <div>
                <strong>Name:</strong> {data.ip.name}
              </div>
              <div>
                <strong>Description:</strong> {data.ip.description}
              </div>
              <div>
                <strong>Project:</strong> {data.ip.project}
              </div>
              <div>
                <strong>Network:</strong> {data.ip.network}
              </div>
              <div>
                <strong>Type:</strong> {IPType[data.ip.type]}
              </div>
              <div>
                <strong>Namespace:</strong> {data.ip.namespace}
              </div>
            </div>
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
