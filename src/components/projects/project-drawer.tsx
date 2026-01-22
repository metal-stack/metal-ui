"use client";

import { useQuery } from "@connectrpc/connect-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { ProjectService } from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import InfoDrawer from "../info-drawer/info-drawer";
import ProjectInfo from "./project-info";

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
    <InfoDrawer
      id={id}
      title="Project detail"
      open={open}
      onOpenChange={setOpen}
    >
      {isLoading && <Skeleton className="h-12" />}
      {error && (
        <AlertHint title="Error loading project" description={error.message} />
      )}
      {!error && data && data.project && <ProjectInfo data={data.project} />}
    </InfoDrawer>
  );
}
