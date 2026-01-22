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
import { TokenService } from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import TokenInfo from "./token-info";

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
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {uuid}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Token detail</DrawerTitle>
          <DrawerDescription>
            <span className="text-primary">{uuid}</span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {isLoading && <Skeleton className="h-12" />}
          {error && (
            <AlertHint
              title="Error loading token"
              description={error.message}
            />
          )}
          {!error && data && data.token && <TokenInfo data={data.token} />}
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
