import { useQuery } from "@connectrpc/connect-query";
import { LoadingTable } from "@/components/ui/loading-table";
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
    return <LoadingTable />;
  }

  if (error) {
    return (
      <AlertHint
        title="Error loading filesystems"
        description={error.message}
      />
    );
  }

  if (!data?.filesystemLayout) {
    return (
      <AlertHint title="Error loading filesystems" description={"No data"} />
    );
  }

  return <FilesystemLayoutInfo data={data.filesystemLayout} />;
}
