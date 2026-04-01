import { useQuery } from "@connectrpc/connect-query";
import { ProjectService } from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectTable } from "@/components/projects/projects-table";

export default function ProjectsPage() {
  const { data, isLoading, error } = useQuery(ProjectService.method.list, {});

  if (isLoading) {
    return <LoadingTable />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading projects" description={error.message} />
    );
  }

  if (!data?.projects?.length) {
    return (
      <EmptyState
        title="No projects found"
        description="Projects will appear here after creation"
      />
    );
  }

  return <ProjectTable data={data.projects} />;
}
