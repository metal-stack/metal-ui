import { useQuery } from "@connectrpc/connect-query";
import { useParams, useSearchParams } from "react-router";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { IPService } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import IPInfo from "@/components/ips/ip-info";

export default function AdminIPDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const project = searchParams.get("project") || "";

  const { data, isLoading, error } = useQuery(IPService.method.get, {
    ip: id,
    project: project,
  });

  if (isLoading) {
    return <LoadingTable />;
  }

  if (error) {
    return <AlertHint title="Error loading IP" description={error.message} />;
  }

  if (!data?.ip) {
    return <AlertHint title="Error loading IP" description={"No data"} />;
  }

  return <IPInfo data={data.ip} />;
}
