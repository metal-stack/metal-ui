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
import { MachineService as MachineServiceAPI } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { MachineService as MachineServiceAdmin } from "@metal-stack/api/js/metalstack/admin/v2/machine_pb";
import SizeInfo from "../sizes/size-info";
import MachineAllocationInfo from "./machine-allocation";

interface MachinesDrawerProps {
  id: string;
  project?: string;
  isAdmin: boolean;
}

export default function MachineDrawer({
  id,
  project,
  isAdmin,
}: MachinesDrawerProps) {
  const [open, setOpen] = useState(false);

  const apiQuery = useQuery(
    MachineServiceAPI.method.get,
    {
      uuid: id,
      project: project,
    },
    { enabled: open && !isAdmin },
  );
  const adminQuery = useQuery(
    MachineServiceAdmin.method.get,
    {
      uuid: id,
    },
    { enabled: open && isAdmin },
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
          <DrawerTitle>Machine detail</DrawerTitle>
          <DrawerDescription>
            <span className="text-primary">{id}</span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {isLoading && <Skeleton className="h-12" />}
          {error && (
            <AlertHint
              title="Error loading machine"
              description={error.message}
            />
          )}
          {!error && data && data.machine && (
            <div className="flex flex-col gap-2">
              <div>
                <strong>Partition:</strong> {data.machine.partition?.id || "-"}
              </div>
              <div>
                <strong>Rack:</strong> {data.machine.rack}
              </div>
              <SizeInfo data={data.machine.size} asCollapse />
              <MachineAllocationInfo
                data={data.machine.allocation}
                asCollapse
              />
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
