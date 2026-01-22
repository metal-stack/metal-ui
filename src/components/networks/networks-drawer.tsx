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
import { NetworkService as NetworkServiceAPI } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import { NetworkService as NetworkServiceAdmin } from "@metal-stack/api/js/metalstack/admin/v2/network_pb";

interface NetworkDrawerProps {
  id: string;
  project?: string;
  isAdmin: boolean;
}

export default function NetworkDrawer({
  id,
  project,
  isAdmin,
}: NetworkDrawerProps) {
  const [open, setOpen] = useState(false);

  const adminQuery = useQuery(
    NetworkServiceAdmin.method.get,
    { id },
    { enabled: open && isAdmin },
  );
  const apiQuery = useQuery(
    NetworkServiceAPI.method.get,
    { id, project },
    { enabled: open && !isAdmin },
  );

  const { data, isLoading, error } = isAdmin ? adminQuery : apiQuery;

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {id}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Network detail</DrawerTitle>
          <DrawerDescription>
            <span className="text-primary">{id}</span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {isLoading && <Skeleton className="h-12" />}
          {error && (
            <AlertHint title="Error loading IP" description={error.message} />
          )}
          {!error && data && data.network && (
            <div className="flex flex-col gap-2">
              <div>
                <strong>Network:</strong> {data.network.name}
              </div>
              <div>
                <strong>Name:</strong> {data.network.name}
              </div>
              <div>
                <strong>Description:</strong> {data.network.description}
              </div>
              <div>
                <strong>Project:</strong> {data.network.project}
              </div>
              <div>
                <strong>Partition:</strong> {data.network.partition}
              </div>
              <div>
                <strong>Namespace:</strong> {data.network.namespace}
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
