import { AuthInterceptor } from "@/interceptors/AuthInterceptor";
import { TransportProvider } from "@connectrpc/connect-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useAuth } from "./AuthProvider";
import { createConnectTransport } from "@connectrpc/connect-web";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  const onUnauthorized = useCallback(() => {
    queryClient.clear(); // 🔑 extrem wichtig
    auth.logout();
  }, [auth]);

  const transport = useMemo(() => {
    if (auth.status !== "authenticated") return null;

    const interceptor = new AuthInterceptor(
      auth.currentContext.apiToken,
      onUnauthorized,
    ).interceptor;

    return createConnectTransport({
      baseUrl: auth.currentContext.apiUrl,
      interceptors: [interceptor],
      useBinaryFormat: false,
    });
  }, [
    auth.status,
    auth.status === "authenticated" ? auth.currentContext.apiToken : null,
    auth.status === "authenticated" ? auth.currentContext.apiUrl : null,
    onUnauthorized,
  ]);

  if (auth.status !== "authenticated" || !transport) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <TransportProvider transport={transport}>{children}</TransportProvider>
    </QueryClientProvider>
  );
}
