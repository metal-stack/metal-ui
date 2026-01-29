import { useQuery } from "@connectrpc/connect-query";
import { useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { SwitchService } from "@metal-stack/api/js/metalstack/admin/v2/switch_pb";
import SwitchInfo from "@/components/switches/switch-info";

export default function AdminSwitchDetailPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery(SwitchService.method.get, {
    id: id,
  });

  if (isLoading) {
    return <Skeleton className="h-12" />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading Switch" description={error.message} />
    );
  }

  if (!data?.switch) {
    return <AlertHint title="Error loading Switch" description={"No data"} />;
  }

  return <SwitchInfo data={data.switch} />;
}
