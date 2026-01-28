"use client";

import { useQuery } from "@connectrpc/connect-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { NetworkService as NetworkServiceAPI } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import { NetworkService as NetworkServiceAdmin } from "@metal-stack/api/js/metalstack/admin/v2/network_pb";
import InfoDrawer from "../info-drawer/info-drawer";
import NetworkInfo from "./network-info";
import { useProject } from "@/providers/ProjectProvider";

interface NetworkDrawerProps {
  id: string;
  isAdmin: boolean;
}

export default function NetworkDrawer({ id, isAdmin }: NetworkDrawerProps) {
  const { currentProject } = useProject();
  const [open, setOpen] = useState(false);

  const adminQuery = useQuery(
    NetworkServiceAdmin.method.get,
    { id },
    { enabled: open && isAdmin },
  );
  const apiQuery = useQuery(
    NetworkServiceAPI.method.get,
    { id, project: currentProject?.uuid },
    { enabled: open && !isAdmin },
  );

  const { data, isLoading, error } = isAdmin ? adminQuery : apiQuery;

  return (
    <InfoDrawer
      id={id}
      title="Network detail"
      open={open}
      onOpenChange={setOpen}
    >
      {isLoading && <Skeleton className="h-12" />}
      {error && (
        <AlertHint title="Error loading IP" description={error.message} />
      )}
      {!error && data && data.network && <NetworkInfo data={data.network} />}
    </InfoDrawer>
  );
}
