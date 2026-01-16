import NoElementFound from "@/components/ui/no-element-found/no-element-found";
import { TenantTable } from "@/components/tenants/tenants-table";
import { useQuery } from "@connectrpc/connect-query";
import { TenantService } from "@metal-stack/api/js/metalstack/admin/v2/tenant_pb";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import AlertHint from "@/components/ui/alert/AlertHint";

export default function AdminTenantsPage() {
  const { data, isLoading, error } = useQuery(TenantService.method.list);

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <AlertHint title="Error loading tenants" description={error.message} />
    );

  if (!data?.tenants.length) return <NoElementFound />;

  return <TenantTable data={data.tenants} />;
}
