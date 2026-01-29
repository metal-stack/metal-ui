import { useQuery } from "@connectrpc/connect-query";
import { useParams } from "react-router";
import { MachineService } from "@metal-stack/api/js/metalstack/admin/v2/machine_pb";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import MachineInfo from "@/components/machines/machine-info";

export default function AdminMachineDetailPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery(MachineService.method.get, {
    uuid: id,
  });

  if (isLoading) {
    return <Skeleton className="h-12" />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading machine" description={error.message} />
    );
  }

  if (!data?.machine) {
    return <AlertHint title="Error loading machine" description={"No data"} />;
  }

  return <MachineInfo data={data.machine} />;
}
