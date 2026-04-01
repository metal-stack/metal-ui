import { EmptyState } from "@/components/ui/empty-state";
import { useQuery } from "@connectrpc/connect-query";
import { MachineService } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { MachinesTable } from "@/components/machines/machines-table";
import { useProject } from "@/providers/ProjectProvider";
import { NoProjectSelected } from "@/components/errors/no-project-selected";

export default function MachinesPage() {
  const { currentProject } = useProject();
  const { data, isLoading, error } = useQuery(
    MachineService.method.list,
    {
      project: currentProject?.uuid,
    },
    {
      enabled: !!currentProject?.uuid,
    },
  );

  if (!currentProject?.uuid) return <NoProjectSelected />;
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
