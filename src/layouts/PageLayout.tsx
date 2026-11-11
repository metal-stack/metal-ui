import { useState } from "react";
import { Outlet, useMatches } from "react-router";
import AppLayout from "@/layouts/AppLayout";
import {
  PageActionsContext,
  PageHeader,
} from "@/components/ui/page/page-header";

export function PageLayout() {
  const matches = useMatches();
  const [actionsEl, setActionsEl] = useState<HTMLElement | null>(null);
  const current = matches[matches.length - 1];
  const title =
    (current?.handle as { title?: string } | undefined)?.title ?? "";

  return (
    <AppLayout>
      <PageActionsContext.Provider value={actionsEl}>
        <PageHeader title={title} setActionsEl={setActionsEl} />
        <Outlet />
      </PageActionsContext.Provider>
    </AppLayout>
  );
}
