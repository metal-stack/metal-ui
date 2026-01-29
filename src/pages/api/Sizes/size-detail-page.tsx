import { useQuery } from "@connectrpc/connect-query";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";
import { SizeService } from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import { useParams } from "react-router";
import SizeInfo from "@/components/sizes/size-info";

export default function SizeDetailPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery(SizeService.method.get, { id });

  if (isLoading) {
    return <Skeleton className="h-12" />;
  }

  if (error) {
    return <AlertHint title="Error loading size" description={error.message} />;
  }

  if (!data?.size) {
    return <AlertHint title="Error loading size" description={"No data"} />;
  }

  return <SizeInfo data={data.size} />;
}
