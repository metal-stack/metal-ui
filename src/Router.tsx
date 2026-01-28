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
import AdminTenantsPage from "./pages/admin/Tenants/tenants-page";
import AdminProjectsPage from "./pages/admin/Projects/projects-page";
import TopologyPage from "./pages/topology";
import { PublicOnlyRoute } from "./layouts/routes/public-route";
import { ProtectedRoute } from "./layouts/routes/private-route";
import { PermissionLayout } from "./layouts/PermissionLayout";
import { permissions } from "./lib/permissions-util";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <QueryLayout />,
            children: [
              {
                element: <PageLayout />,
                children: [
                  {
                    element: <PermissionLayout />,
                    children: [
                      {
                        path: "/",
                        element: <Dashboard />,
                        handle: { title: "Dashboard" },
                      },
                      {
                        path: "/tenants",
                        element: <TenantsPage />,
                        handle: {
                          title: "Tenant List",
                          permission: permissions.API.tenants,
                        },
                      },
                      {
                        path: "/projects",
                        element: <ProjectsPage />,
                        handle: {
                          title: "Projects",
                          permission: permissions.API.projects,
                        },
                      },
                      {
                        path: "/machines",
                        element: <MachinesPage />,
                        handle: {
                          title: "Machines",
                          permission: permissions.API.machines,
                        },
                      },
                      {
                        path: "/images",
                        element: <ImagesPage />,
                        handle: {
                          title: "Images",
                          permission: permissions.API.images,
                        },
                      },
                      {
                        path: "/ips",
                        element: <IPsPage />,
                        handle: {
                          title: "IPs",
                          permission: permissions.API.ips,
                        },
                      },
                      {
                        path: "/partitions",
                        element: <PartitionsPage />,
                        handle: {
                          title: "Partitions",
                          permission: permissions.API.partitions,
                        },
                      },
                      {
                        path: "/sizes",
                        element: <SizesPage />,
                        handle: {
                          title: "Sizes",
                          permission: permissions.API.sizes,
                        },
                      },
                      {
                        path: "/networks",
                        element: <NetworksPage />,
                        handle: {
                          title: "Networks",
                          permission: permissions.API.networks,
                        },
                      },
                      {
                        path: "/filesystems",
                        element: <FilesystemsPage />,
                        handle: {
                          title: "Filesystems",
                          permission: permissions.API.filesystems,
                        },
                      },
                      {
                        path: "/tokens",
                        element: <TokensPage />,
                        handle: {
                          title: "Tokens",
                          permission: permissions.API.tokens,
                        },
                      },
                      {
                        path: "/topology",
                        element: <TopologyPage />,
                        handle: { title: "Topology" },
                      },
                      {
                        path: "/admin",
                        handle: { title: "Admin" },
                        children: [
                          {
                            path: "machines",
                            element: <AdminMachinesPage />,
                            handle: {
                              title: "Admin · Machines",
                              permission: permissions.ADMIN.machines,
                            },
                          },
                          {
                            path: "ips",
                            element: <AdminIPsPage />,
                            handle: {
                              title: "Admin · IPs",
                              permission: permissions.ADMIN.ips,
                            },
                          },
                          {
                            path: "networks",
                            element: <AdminNetworksPage />,
                            handle: {
                              title: "Admin · Networks",
                              permission: permissions.ADMIN.networks,
                            },
                          },
                          {
                            path: "switches",
                            element: <AdminSwitchesPage />,
                            handle: {
                              title: "Admin · Switches",
                              permission: permissions.ADMIN.switches,
                            },
                          },
                          {
                            path: "tenants",
                            element: <AdminTenantsPage />,
                            handle: {
                              title: "Admin · Tenants",
                              permission: permissions.ADMIN.tenants,
                            },
                          },
                          {
                            path: "projects",
                            element: <AdminProjectsPage />,
                            handle: {
                              title: "Admin · Projects",
                              permission: permissions.ADMIN.projects,
                            },
                          },
                        ],
                      },
                    ],
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
