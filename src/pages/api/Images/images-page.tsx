import { EmptyState } from "@/components/ui/empty-state";
import { useQuery } from "@connectrpc/connect-query";
import { ImageService } from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { ImagesTable } from "@/components/images/images-table";

export default function ImagesPage() {
  const { data, isLoading, error } = useQuery(ImageService.method.list, {});

  if (isLoading) return <LoadingTable />;
  if (error)
    return (
      <AlertHint title="Error loading images" description={error.message} />
    );

  if (!data?.images.length) {
    return (
      <EmptyState
        title="No images found"
        description="Images will appear here after upload"
      />
    );
  }

  return <ImagesTable data={data.images} />;
}
