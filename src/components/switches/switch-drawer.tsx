"use client";

import { useQuery } from "@connectrpc/connect-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import InfoDrawer from "../info-drawer/info-drawer";
import { SwitchService } from "@metal-stack/api/js/metalstack/admin/v2/switch_pb";
import SwitchInfo from "./switch-info";

interface SwitchDrawerProps {
  id: string;
}

export default function SwitchDrawer({ id }: SwitchDrawerProps) {
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useQuery(
    SwitchService.method.get,
    { id },
    { enabled: open },
  );

  return (
    <InfoDrawer
      id={id}
      title="Switch detail"
      open={open}
      onOpenChange={setOpen}
    >
      {isLoading && <Skeleton className="h-12" />}
      {error && (
        <AlertHint title="Error loading switch" description={error.message} />
      )}
      {!error && data && data.switch && <SwitchInfo data={data.switch} />}
    </InfoDrawer>
  );
}
