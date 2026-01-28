import { useQuery } from "@connectrpc/connect-query";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { ImageService } from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import ImageInfo from "../../../components/images/image-info";
import { useParams } from "react-router";

export default function ImageDetailPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery(ImageService.method.get, { id });

  if (isLoading) {
    return <Skeleton className="h-12" />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading image" description={error.message} />
    );
  }

  if (!data?.image) {
    return <AlertHint title="Error loading image" description={"No data"} />;
  }
  return <ImageInfo data={data.image} />;
}
