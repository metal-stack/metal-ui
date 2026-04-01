import { EmptyState } from "@/components/ui/empty-state";
import { TenantTable } from "@/components/tenants/tenants-table";
import { useQuery } from "@connectrpc/connect-query";
import { TenantService } from "@metal-stack/api/js/metalstack/admin/v2/tenant_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";

export default function AdminTenantsPage() {
  const { data, isLoading, error } = useQuery(TenantService.method.list);

  if (isLoading) return <LoadingTable />;
  if (error)
    return (
      <AlertHint title="Error loading tenants" description={error.message} />
    );

  if (!data?.tenants.length) {
    return (
      <EmptyState
        title="No tenants found"
        description="Tenants will appear here after creation"
      />
    );
  }

  return <TenantTable data={data.tenants} />;
}
