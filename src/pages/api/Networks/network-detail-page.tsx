import { useQuery } from "@connectrpc/connect-query";
import { useParams } from "react-router";
import { useProject } from "@/providers/ProjectProvider";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { NetworkService } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import NetworkInfo from "@/components/networks/network-info";

export default function NetworkDetailPage() {
  const { id } = useParams();
  const { currentProject } = useProject();

  const { data, isLoading, error } = useQuery(NetworkService.method.get, {
    id: id,
    project: currentProject?.uuid,
  });

  if (isLoading) {
    return <Skeleton className="h-12" />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading Network" description={error.message} />
    );
  }

  if (!data?.network) {
    return <AlertHint title="Error loading Network" description={"No data"} />;
  }

  return <NetworkInfo data={data.network} />;
}
