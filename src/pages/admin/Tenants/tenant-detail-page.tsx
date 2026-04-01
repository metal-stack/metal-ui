import { TenantService } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { useQuery } from "@connectrpc/connect-query";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { useParams } from "react-router";
import TenantInfo from "@/components/tenants/tenant-info";

export default function AdminTenantDetailPage() {
  const { id } = useParams();
  // tenant-admin service has no get -> use api
  const { data, isLoading, error } = useQuery(TenantService.method.get, {
    login: id,
  });

  if (isLoading) {
    return <LoadingTable />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading tenant" description={error.message} />
    );
  }

  if (!data?.tenant) {
    return <AlertHint title="Error loading tenant" description={"No data"} />;
  }

  return <TenantInfo data={data.tenant} />;
}
