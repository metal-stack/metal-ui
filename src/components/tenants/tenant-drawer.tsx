"use client";

import { TenantService } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { useQuery } from "@connectrpc/connect-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import InfoDrawer from "../info-drawer/info-drawer";
import TenantInfo from "./tenant-info";

interface TenantDrawerProps {
  id: string;
}

export default function TenantDrawer({ id }: TenantDrawerProps) {
  const [open, setOpen] = useState(false);
  // tenant-admin service has no get -> use api
  const { data, isLoading, error } = useQuery(
    TenantService.method.get,
    {
      login: id,
    },
    { enabled: open },
  );

  return (
    <InfoDrawer
      id={id}
      title="Tenant detail"
      open={open}
      onOpenChange={setOpen}
    >
      {isLoading && <Skeleton className="h-12" />}
      {error && (
        <AlertHint title="Error loading tenant" description={error.message} />
      )}
      {!error && data && data.tenant && <TenantInfo data={data.tenant} />}
    </InfoDrawer>
  );
}
