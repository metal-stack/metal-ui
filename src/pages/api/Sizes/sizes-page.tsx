import { useQuery } from "@connectrpc/connect-query";
import { SizeService } from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { EmptyState } from "@/components/ui/empty-state";
import { SizesTable } from "@/components/sizes/sizes-table";

export default function SizesPage() {
  const { data, isLoading, error } = useQuery(SizeService.method.list, {});

  if (isLoading) {
    return <LoadingTable />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading sizes" description={error.message} />
    );
  }

  if (!data?.sizes?.length) {
    return (
      <EmptyState
        title="No sizes found"
        description="Sizes will appear here after creation"
      />
    );
  }

  return <SizesTable data={data.sizes} />;
}
