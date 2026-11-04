import { AuthInterceptor } from "@/interceptors/AuthInterceptor";
import { TransportProvider } from "@connectrpc/connect-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useAuth } from "./AuthProvider";
import { createConnectTransport } from "@connectrpc/connect-web";
import { notifications } from "@mantine/notifications";

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
    notifications.show({
      id: "auth-load-config-failed",
      color: "red",
      title: "Auth",
      message: "Session expired. Please log in again.",
    });

    queryClient.clear();
    auth.logout();
  }, [auth]);

  const transport = useMemo(() => {
    if (auth.status !== "authenticated") return null;

    const interceptor = new AuthInterceptor(
      auth.apiToken,
      onUnauthorized,
    ).interceptor;

    return createConnectTransport({
      baseUrl: auth.apiUrl,
      interceptors: [interceptor],
      useBinaryFormat: false,
    });
  }, [auth.status, auth.apiToken, auth.apiUrl, onUnauthorized]);

  if (auth.status !== "authenticated" || !transport) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <TransportProvider transport={transport}>{children}</TransportProvider>
    </QueryClientProvider>
  );
}
