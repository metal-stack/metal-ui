import { EmptyState } from "@/components/ui/empty-state";
import { useQuery } from "@connectrpc/connect-query";
import { NetworkService } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { NetworksTable } from "@/components/networks/networks-table";
import { useProject } from "@/providers/ProjectProvider";
import { NoProjectSelected } from "@/components/errors/no-project-selected";

export default function NetworksPage() {
  const { currentProject } = useProject();
  const { data, isLoading, error } = useQuery(
    NetworkService.method.list,
    {
      project: currentProject?.uuid,
      query: {},
    },
    {
      enabled: !!currentProject?.uuid,
    },
  );

  if (!currentProject?.uuid) return <NoProjectSelected />;
  if (isLoading) return <LoadingTable />;
  if (error)
    return (
      <AlertHint title="Error loading networks" description={error.message} />
    );

  if (!data?.networks.length) {
    return (
      <EmptyState
        title="No networks found"
        description="Create a network to get started"
      />
    );
  }

  return <NetworksTable data={data.networks} />;
}
