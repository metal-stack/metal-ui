import { createBrowserRouter } from "react-router";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { QueryLayout } from "./layouts/QueryLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { PageLayout } from "./layouts/PageLayout";
import TenantsPage from "./pages/api/Tenants/tenants-page";
import ProjectsPage from "./pages/api/Projects/projects-page";
import MachinesPage from "./pages/api/Machines/machines-page";
import ImagesPage from "./pages/api/Images/images-page";
import IPsPage from "./pages/api/IPs/ips-page";
import PartitionsPage from "./pages/api/Partitions/partitions-page";
import SizesPage from "./pages/api/Sizes/sizes-page";
import NetworksPage from "./pages/api/Networks/networks-page";
import FilesystemsPage from "./pages/api/Filesystems/filesystems-page";
import TokensPage from "./pages/api/Tokens/tokens-page";
import AdminMachinesPage from "./pages/admin/Machines/machines-page";
import AdminIPsPage from "./pages/admin/IPs/ips-page";
import AdminNetworksPage from "./pages/admin/Networks/networks-page";
import AdminSwitchesPage from "./pages/admin/Switches/networks-page";
import NotFoundPage from "./pages/error-page";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <QueryLayout />,
        children: [
          {
            element: <PageLayout />,
            children: [
              {
                path: "/",
                element: <Dashboard />,
                handle: { title: "Dashboard" },
              },
              {
                path: "/tenants",
                element: <TenantsPage />,
                handle: { title: "Tenant List" },
              },
              {
                path: "/projects",
                element: <ProjectsPage />,
                handle: { title: "Projects" },
              },
              {
                path: "/machines",
                element: <MachinesPage />,
                handle: { title: "Machines" },
              },
              {
                path: "/images",
                element: <ImagesPage />,
                handle: { title: "Images" },
              },
              {
                path: "/ips",
                element: <IPsPage />,
                handle: { title: "IPs" },
              },
              {
                path: "/partitions",
                element: <PartitionsPage />,
                handle: { title: "Partitions" },
              },
              {
                path: "/sizes",
                element: <SizesPage />,
                handle: { title: "Sizes" },
              },
              {
                path: "/networks",
                element: <NetworksPage />,
                handle: { title: "Networks" },
              },
              {
                path: "/filesystems",
                element: <FilesystemsPage />,
                handle: { title: "Filesystems" },
              },
              {
                path: "/tokens",
                element: <TokensPage />,
                handle: { title: "Tokens" },
              },

              {
                path: "/admin",
                handle: { title: "Admin" },
                children: [
                  {
                    path: "machines",
                    element: <AdminMachinesPage />,
                    handle: { title: "Admin · Machines" },
                  },
                  {
                    path: "ips",
                    element: <AdminIPsPage />,
                    handle: { title: "Admin · IPs" },
                  },
                  {
                    path: "networks",
                    element: <AdminNetworksPage />,
                    handle: { title: "Admin · Networks" },
                  },
                  {
                    path: "switches",
                    element: <AdminSwitchesPage />,
                    handle: { title: "Admin · Switches" },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
