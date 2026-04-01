import { EmptyState } from "@/components/ui/empty-state";
import { useQuery } from "@connectrpc/connect-query";
import { IPService } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import { useProject } from "@/providers/ProjectProvider";
import AlertHint from "@/components/ui/alert/AlertHint";
import { IpsTable } from "@/components/ips/ips-table";
import { NoProjectSelected } from "@/components/errors/no-project-selected";

export default function IPsPage() {
  const { currentProject } = useProject();
  const { data, isLoading, error } = useQuery(
    IPService.method.list,
    {
      project: currentProject?.uuid,
    },
    { enabled: !!currentProject?.uuid },
  );

  if (!currentProject?.uuid) return <NoProjectSelected />;
  if (isLoading) return <LoadingTable />;
  if (error)
    return (
      <AlertHint title="Error loading IPs" description={error.message} />
    );

  if (!data?.ips.length) {
    return (
      <EmptyState
        title="No IPs found"
        description="IPs will appear here after allocation"
      />
    );
  }

  return <IpsTable data={data.ips} />;
}
