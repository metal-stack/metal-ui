import { EmptyState } from "@/components/ui/empty-state";
import { useQuery } from "@connectrpc/connect-query";
import { FilesystemService } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { FilesystemsTable } from "@/components/filesystem/filesystems-table";

export default function FilesystemsPage() {
  const { data, isLoading, error } = useQuery(FilesystemService.method.list);

  if (isLoading) return <LoadingTable />;
  if (error)
    return (
      <AlertHint
        title="Error loading filesystems"
        description={error.message}
      />
    );

  if (!data?.filesystemLayouts.length) {
    return (
      <EmptyState
        title="No filesystems found"
        description="Filesystems will appear here after creation"
      />
    );
  }

  return <FilesystemsTable data={data.filesystemLayouts} />;
}
