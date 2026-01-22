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
import { ProjectService } from "@metal-stack/api/js/metalstack/api/v2/project_pb";

interface ProjectDrawerProps {
  id: string;
}

export default function ProjectDrawer({ id }: ProjectDrawerProps) {
  const [open, setOpen] = useState(false);
  // project-admin service has no get -> use api
  const { data, isLoading, error } = useQuery(
    ProjectService.method.get,
    {
      project: id,
    },
    { enabled: open },
  );

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {id}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Project detail</DrawerTitle>
          <DrawerDescription>
            <span className="text-primary">{id}</span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {isLoading && <Skeleton className="h-12" />}
          {error && (
            <AlertHint
              title="Error loading project"
              description={error.message}
            />
          )}
          {!error && data && data.project && (
            <div className="flex flex-col gap-2">
              <div>
                <strong>Name:</strong> {data.project.name}
              </div>
              <div>
                <strong>Tenant:</strong> {data.project.tenant}
              </div>
              <div>
                <strong>Description:</strong> {data.project.description}
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
