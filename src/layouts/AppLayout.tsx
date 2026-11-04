import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AppSidebar } from "@/components/ui/app-shell/app-sidebar";
import { SiteHeader } from "@/components/ui/app-shell/site-header";

export default function AppLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      layout="alt"
      header={{ height: 56 }}
      navbar={{
        width: 288,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <SiteHeader
        title={title}
        mobileOpened={mobileOpened}
        desktopOpened={desktopOpened}
        toggleMobile={toggleMobile}
        toggleDesktop={toggleDesktop}
      />
      <AppShell.Navbar>
        <AppSidebar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
