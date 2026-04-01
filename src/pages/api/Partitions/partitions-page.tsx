import { EmptyState } from "@/components/ui/empty-state";
import { useQuery } from "@connectrpc/connect-query";
import { PartitionService } from "@metal-stack/api/js/metalstack/api/v2/partition_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { PartitionsTable } from "@/components/partitions/partitions-table";

export default function PartitionsPage() {
  const { data, isLoading, error } = useQuery(PartitionService.method.list, {});

  if (isLoading) return <LoadingTable />;
  if (error)
    return (
      <AlertHint title="Error loading partitions" description={error.message} />
    );

  if (!data?.partitions.length) {
    return (
      <EmptyState
        title="No partitions found"
        description="Partitions will appear here after creation"
      />
    );
  }

  return <PartitionsTable data={data.partitions} />;
}
