import NoElementFound from "@/components/ui/no-element-found/no-element-found";
import { useQuery } from "@connectrpc/connect-query";
import { IPService } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import { useProject } from "@/providers/ProjectProvider";
import AlertHint from "@/components/ui/alert/AlertHint";
import { IpsTable } from "@/components/ips/ips-table";
import { NoProjectSelected } from "@/components/errors/no-project-selected";

export default function IPsPage() {
  const { currentProject } = useProject();
  const { data, isLoading, error } = useQuery(
    IPService.method.list,
    {
      project: currentProject?.uuid,
    },
    { enabled: !!currentProject?.uuid },
  );

  if (!currentProject?.uuid) return <NoProjectSelected />;
  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <AlertHint title="Error loading images" description={error.message} />
    );

  if (!data?.ips.length) return <NoElementFound />;

  return <IpsTable data={data.ips} />;
}
