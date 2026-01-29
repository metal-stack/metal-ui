import NoElementFound from "@/components/ui/no-element-found/no-element-found";
import { useQuery } from "@connectrpc/connect-query";
import { NetworkService } from "@metal-stack/api/js/metalstack/admin/v2/network_pb";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import AlertHint from "@/components/ui/alert/AlertHint";
import { NetworksTable } from "@/components/networks/networks-table";

export default function AdminNetworksPage() {
  const { data, isLoading, error } = useQuery(NetworkService.method.list, {});

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <AlertHint title="Error loading networks" description={error.message} />
    );

  if (!data?.networks.length) return <NoElementFound />;

  return <NetworksTable data={data.networks} isAdmin={true} />;
}
