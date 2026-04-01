import { EmptyState } from "@/components/ui/empty-state";
import { useQuery } from "@connectrpc/connect-query";
import { TokenService } from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import { LoadingTable } from "@/components/ui/loading-table";
import AlertHint from "@/components/ui/alert/AlertHint";
import { TokensTable } from "@/components/tokens/tokens-table";

export default function TokensPage() {
  const { data, isLoading, error } = useQuery(TokenService.method.list);

  if (isLoading) return <LoadingTable />;
  if (error)
    return (
      <AlertHint title="Error loading tokens" description={error.message} />
    );

  if (!data?.tokens.length) {
    return (
      <EmptyState
        title="No tokens found"
        description="Tokens will appear here after creation"
      />
    );
  }

  return <TokensTable data={data.tokens} />;
}
