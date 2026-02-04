import NoElementFound from "@/components/ui/no-element-found/no-element-found";
import { useQuery } from "@connectrpc/connect-query";
import { MachineService } from "@metal-stack/api/js/metalstack/admin/v2/machine_pb";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import AlertHint from "@/components/ui/alert/AlertHint";
import { MachinesTable } from "@/components/machines/machines-table";

export default function AdminMachinesPage() {
  const { data, isLoading, error } = useQuery(MachineService.method.list, {
    query: {},
  });

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <AlertHint title="Error loading machines" description={error.message} />
    );

  if (!data?.machines.length) return <NoElementFound />;

  return <MachinesTable data={data.machines} />;
}
