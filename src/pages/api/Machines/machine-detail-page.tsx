import { useQuery } from "@connectrpc/connect-query";
import { useParams } from "react-router";
import { MachineService } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { useProject } from "@/providers/ProjectProvider";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import MachineInfo from "@/components/machines/machine-info";

export default function MachineDetailPage() {
  const { id } = useParams();
  const { currentProject } = useProject();

  const { data, isLoading, error } = useQuery(MachineService.method.get, {
    uuid: id,
    project: currentProject?.uuid,
  });

  if (isLoading) {
    return <Skeleton className="h-12" />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading machine" description={error.message} />
    );
  }

  if (!data?.machine) {
    return <AlertHint title="Error loading machine" description={"No data"} />;
  }

  return <MachineInfo data={data.machine} />;
}
