import { useQuery } from "@connectrpc/connect-query";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { PartitionService } from "@metal-stack/api/js/metalstack/api/v2/partition_pb";
import { useParams } from "react-router";
import PartitionInfo from "@/components/partitions/partition-info";

export default function PartitionDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(PartitionService.method.get, {
    id: id,
  });

  if (isLoading) {
    return <Skeleton className="h-12" />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading partition" description={error.message} />
    );
  }

  if (!data?.partition) {
    return (
      <AlertHint title="Error loading partition" description={"No data"} />
    );
  }

  return <PartitionInfo data={data.partition} />;
}
