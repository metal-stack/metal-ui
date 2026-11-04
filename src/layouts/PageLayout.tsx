import { Outlet, useMatches } from "react-router";
import AppLayout from "@/layouts/AppLayout";

export function PageLayout() {
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const title =
    (current?.handle as { title?: string } | undefined)?.title ?? "";

  return (
    <AppLayout title={title}>
      <Outlet />
    </AppLayout>
  );
}
