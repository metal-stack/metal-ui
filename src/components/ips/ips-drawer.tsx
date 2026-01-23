"use client";
import { useQuery } from "@connectrpc/connect-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { IPService } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import InfoDrawer from "../info-drawer/info-drawer";
import IPInfo from "./ip-info";

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
    <InfoDrawer id={id} title="IP detail" open={open} onOpenChange={setOpen}>
      {isLoading && <Skeleton className="h-12" />}
      {error && (
        <AlertHint title="Error loading IP" description={error.message} />
      )}
      {!error && data && data.ip && <IPInfo data={data.ip} />}
    </InfoDrawer>
  );
}
