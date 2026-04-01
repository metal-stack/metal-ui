import { useQuery } from "@connectrpc/connect-query";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { ProjectService } from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import { useParams } from "react-router";
import ProjectInfo from "@/components/projects/project-info";

export default function ProjectDetailPage() {
  const { id } = useParams();
  // project-admin service has no get -> use api
  const { data, isLoading, error } = useQuery(ProjectService.method.get, {
    project: id,
  });

  if (isLoading) {
    return <LoadingTable />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading project" description={error.message} />
    );
  }

  if (!data?.project) {
    return <AlertHint title="Error loading project" description={"No data"} />;
  }

  return <ProjectInfo data={data.project} />;
}
