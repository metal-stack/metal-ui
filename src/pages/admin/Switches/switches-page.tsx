import NoElementFound from "@/components/ui/no-element-found/no-element-found";
import { useQuery } from "@connectrpc/connect-query";
import { SwitchService } from "@metal-stack/api/js/metalstack/admin/v2/switch_pb";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import AlertHint from "@/components/ui/alert/AlertHint";
import { SwitchesTable } from "@/components/switches/switches-table";

export default function AdminSwitchesPage() {
  const { data, isLoading, error } = useQuery(SwitchService.method.list, {
    query: {},
  });

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <AlertHint title="Error loading switches" description={error.message} />
    );

  if (!data?.switches.length) return <NoElementFound />;

  return <SwitchesTable data={data.switches} />;
}
