"use client";

import { useQuery } from "@connectrpc/connect-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { MachineService as MachineServiceAPI } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { MachineService as MachineServiceAdmin } from "@metal-stack/api/js/metalstack/admin/v2/machine_pb";
import SizeInfo from "../sizes/size-info";
import MachineAllocationInfo from "./machine-allocation-info";
import InfoCollapsible from "../info-collapsible/info-collapsible";
import InfoDrawer from "../info-drawer/info-drawer";

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
    <InfoDrawer
      id={id}
      title="Machine detail"
      open={open}
      onOpenChange={setOpen}
    >
      {isLoading && <Skeleton className="h-12" />}
      {error && (
        <AlertHint title="Error loading machine" description={error.message} />
      )}
      {!error && data && data.machine && (
        <div className="flex flex-col gap-2">
          <div>
            <strong>Partition:</strong> {data.machine.partition?.id || "-"}
          </div>
          <div>
            <strong>Rack:</strong> {data.machine.rack}
          </div>
          <InfoCollapsible title="Size">
            {data.machine.size && <SizeInfo data={data.machine.size} />}
          </InfoCollapsible>
          <InfoCollapsible title="Allocation">
            {data.machine.allocation && (
              <MachineAllocationInfo data={data.machine.allocation} />
            )}
          </InfoCollapsible>
        </div>
      )}
    </InfoDrawer>
  );
}
