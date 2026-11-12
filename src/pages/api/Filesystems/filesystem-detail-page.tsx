import { SectionGrid } from "@/components/ui/section/section";
import { useQuery } from "@connectrpc/connect-query";
import { Skeleton } from "@mantine/core";
import AlertHint from "@/components/ui/alert/AlertHint";
import { FilesystemService } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import FilesystemLayoutInfo from "@/components/filesystem/filesystem-layout-info";
import { useParams } from "react-router";

export default function FilesystemDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(FilesystemService.method.get, {
    id,
  });

  if (isLoading) {
    return <Skeleton h={48} />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading filesystem" description={error.message} />
    );
  }

  if (!data?.filesystemLayout) {
    return (
      <AlertHint title="Error loading filesystem" description={"No data"} />
    );
  }

  return (
    <SectionGrid>
      <FilesystemLayoutInfo data={data.filesystemLayout} />
    </SectionGrid>
  );
}
