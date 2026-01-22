"use client";

import { useQuery } from "@connectrpc/connect-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { TokenService } from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import TokenInfo from "./token-info";
import InfoDrawer from "../info-drawer/info-drawer";

interface TokenDrawerProps {
  uuid: string;
}

export default function TokenDrawer({ uuid }: TokenDrawerProps) {
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useQuery(
    TokenService.method.get,
    { uuid },
    { enabled: open },
  );

  return (
    <InfoDrawer
      id={uuid}
      open={open}
      onOpenChange={setOpen}
      title="Token detail"
    >
      {isLoading && <Skeleton className="h-12" />}
      {error && (
        <AlertHint title="Error loading token" description={error.message} />
      )}
      {!error && data && data.token && <TokenInfo data={data.token} />}
    </InfoDrawer>
  );
}
