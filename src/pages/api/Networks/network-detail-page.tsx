import { SectionGrid } from "@/components/ui/section/section";
import { useQuery } from "@connectrpc/connect-query";
import { useParams } from "react-router";
import { useProject } from "@/providers/ProjectProvider";
import { Skeleton } from "@mantine/core";
import AlertHint from "@/components/ui/alert/AlertHint";
import { NetworkService } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import NetworkInfo from "@/components/networks/network-info";

export default function NetworkDetailPage() {
  const { id } = useParams();
  const { currentProject } = useProject();

  const { data, isLoading, error } = useQuery(NetworkService.method.get, {
    id: id,
    project: currentProject?.uuid,
  });

  if (isLoading) {
    return <Skeleton h={48} />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading network" description={error.message} />
    );
  }

  if (!data?.network) {
    return <AlertHint title="Error loading network" description={"No data"} />;
  }

  return (
    <SectionGrid>
      <NetworkInfo data={data.network} />
    </SectionGrid>
  );
}
