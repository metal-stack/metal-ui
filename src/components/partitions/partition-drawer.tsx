"use client";

import { useQuery } from "@connectrpc/connect-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { PartitionService } from "@metal-stack/api/js/metalstack/api/v2/partition_pb";
import PartitionInfo from "./partition-info";
import InfoDrawer from "../info-drawer/info-drawer";

interface PartitionDrawerProps {
  id: string;
}

export default function PartitionDrawer({ id }: PartitionDrawerProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useQuery(
    PartitionService.method.get,
    {
      id: id,
    },
    { enabled: open },
  );

  return (
    <InfoDrawer
      id={id}
      open={open}
      onOpenChange={setOpen}
      title="Partition detail"
    >
      {isLoading && <Skeleton className="h-12" />}
      {error && (
        <AlertHint
          title="Error loading Partition"
          description={error.message}
        />
      )}
      {!error && data && data.partition && (
        <PartitionInfo data={data.partition} />
      )}
    </InfoDrawer>
  );
}
