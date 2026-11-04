import { useQuery } from "@connectrpc/connect-query";
import { Skeleton } from "@mantine/core";
import AlertHint from "@/components/ui/alert/AlertHint";
import { TokenService } from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import { useParams } from "react-router";
import TokenInfo from "@/components/tokens/token-info";

export default function TokenDrawer() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery(TokenService.method.get, {
    uuid: id,
  });

  if (isLoading) {
    return <Skeleton h={48} />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading token" description={error.message} />
    );
  }

  if (!data?.token) {
    return <AlertHint title="Error loading token" description={"No data"} />;
  }

  return <TokenInfo data={data.token} />;
}
