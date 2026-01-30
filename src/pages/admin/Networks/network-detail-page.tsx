import { useQuery } from "@connectrpc/connect-query";
import { useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { NetworkService } from "@metal-stack/api/js/metalstack/admin/v2/network_pb";
import NetworkInfo from "@/components/networks/network-info";

export default function AdminNetworkDetailPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery(NetworkService.method.get, {
    id: id,
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
