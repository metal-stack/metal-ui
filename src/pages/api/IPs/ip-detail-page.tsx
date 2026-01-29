import { useQuery } from "@connectrpc/connect-query";
import { useParams } from "react-router";
import { useProject } from "@/providers/ProjectProvider";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { IPService } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import IPInfo from "@/components/ips/ip-info";

export default function IPDetailPage() {
  const { id } = useParams();
  const { currentProject } = useProject();

  const { data, isLoading, error } = useQuery(IPService.method.get, {
    ip: id,
    project: currentProject?.uuid,
  });

  if (isLoading) {
    return <Skeleton className="h-12" />;
  }

  if (error) {
    return <AlertHint title="Error loading IP" description={error.message} />;
  }

  if (!data?.ip) {
    return <AlertHint title="Error loading IP" description={"No data"} />;
  }

  return <IPInfo data={data.ip} />;
}
