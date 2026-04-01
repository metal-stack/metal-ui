import { EmptyState } from "@/components/ui/empty-state";
import { useQuery } from "@connectrpc/connect-query";
import { IPService } from "@metal-stack/api/js/metalstack/admin/v2/ip_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { IpsTable } from "@/components/ips/ips-table";

export default function AdminIPsPage() {
  const { data, isLoading, error } = useQuery(IPService.method.list, {});

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
