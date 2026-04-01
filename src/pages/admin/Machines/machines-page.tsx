import { EmptyState } from "@/components/ui/empty-state";
import { useQuery } from "@connectrpc/connect-query";
import { MachineService } from "@metal-stack/api/js/metalstack/admin/v2/machine_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { MachinesTable } from "@/components/machines/machines-table";

export default function AdminMachinesPage() {
  const { data, isLoading, error } = useQuery(MachineService.method.list, {
    query: {},
  });

  if (isLoading) return <LoadingTable />;
  if (error)
    return (
      <AlertHint title="Error loading machines" description={error.message} />
    );

  if (!data?.machines.length) {
    return (
      <EmptyState
        title="No machines found"
        description="Machines will appear here when they register"
      />
    );
  }

  return <MachinesTable data={data.machines} />;
}
