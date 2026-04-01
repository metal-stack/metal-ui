import { EmptyState } from "@/components/ui/empty-state";
import { useQuery } from "@connectrpc/connect-query";
import { SwitchService } from "@metal-stack/api/js/metalstack/admin/v2/switch_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { SwitchesTable } from "@/components/switches/switches-table";

export default function AdminSwitchesPage() {
  const { data, isLoading, error } = useQuery(SwitchService.method.list, {
    query: {},
  });

  if (isLoading) return <LoadingTable />;
  if (error)
    return (
      <AlertHint title="Error loading switches" description={error.message} />
    );

  if (!data?.switches.length) {
    return (
      <EmptyState
        title="No switches found"
        description="Switches will appear here when discovered"
      />
    );
  }

  return <SwitchesTable data={data.switches} />;
}
