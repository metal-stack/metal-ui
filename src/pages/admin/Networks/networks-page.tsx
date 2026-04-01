import { EmptyState } from "@/components/ui/empty-state";
import { useQuery } from "@connectrpc/connect-query";
import { NetworkService } from "@metal-stack/api/js/metalstack/admin/v2/network_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { NetworksTable } from "@/components/networks/networks-table";

export default function AdminNetworksPage() {
  const { data, isLoading, error } = useQuery(NetworkService.method.list, {});

  if (isLoading) return <LoadingTable />;
  if (error)
    return (
      <AlertHint title="Error loading networks" description={error.message} />
    );

  if (!data?.networks.length) {
    return (
      <EmptyState
        title="No networks found"
        description="Networks will appear here after creation"
      />
    );
  }

  return <NetworksTable data={data.networks} />;
}
