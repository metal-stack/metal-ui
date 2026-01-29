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
import MachineDetailPage from "./pages/api/Machines/machine-detail-page";
import FilesystemDetailPage from "./pages/api/Filesystems/filesystem-detail-page";
import ImageDetailPage from "./pages/api/Images/image-detail-page";
import PartitionDetailPage from "./pages/api/Partitions/partition-detail-page";
import ProjectDetailPage from "./pages/api/Projects/project-detail-page";
import SizeDetailPage from "./pages/api/Sizes/size-detail-page";
import TenantDetailPage from "./pages/api/Tenants/tenant-detail-page";
import IPDetailPage from "./pages/api/IPs/ip-detail-page";
import NetworkDetailPage from "./pages/api/Networks/network-detail-page";
import TokenDetailPage from "./pages/api/Tokens/token-detail-page";

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
                        path: "/topology",
                        element: <TopologyPage />,
                        handle: { title: "Topology" },
                      },
                      {
                        path: "/tenants",
                        children: [
                          {
                            index: true,
                            element: <TenantsPage />,
                            handle: {
                              title: "Tenants",
                              permission: permissions.API.tenants,
                            },
                          },
                          {
                            path: ":id",
                            element: <TenantDetailPage />,
                            handle: {
                              title: "Tenant detail",
                              permission: permissions.API.tenants,
                            },
                          },
                        ],
                      },
                      {
                        path: "/projects",
                        children: [
                          {
                            index: true,
                            element: <ProjectsPage />,
                            handle: {
                              title: "Projects",
                              permission: permissions.API.projects,
                            },
                          },
                          {
                            path: ":id",
                            element: <ProjectDetailPage />,
                            handle: {
                              title: "Project detail",
                              permission: permissions.API.projects,
                            },
                          },
                        ],
                      },
                      {
                        path: "/machines",
                        children: [
                          {
                            index: true,
                            element: <MachinesPage />,
                            handle: {
                              title: "Machines",
                              permission: permissions.API.machines,
                            },
                          },
                          {
                            path: ":id",
                            element: <MachineDetailPage />,
                            handle: {
                              title: "Machine detail",
                              permission: permissions.API.machines,
                            },
                          },
                        ],
                      },
                      {
                        path: "/images",
                        children: [
                          {
                            index: true,
                            element: <ImagesPage />,
                            handle: {
                              title: "Images",
                              permission: permissions.API.images,
                            },
                          },
                          {
                            path: ":id",
                            element: <ImageDetailPage />,
                            handle: {
                              title: "Image detail",
                              permission: permissions.API.images,
                            },
                          },
                        ],
                      },
                      {
                        path: "/ips",
                        children: [
                          {
                            index: true,
                            element: <IPsPage />,
                            handle: {
                              title: "IPs",
                              permission: permissions.API.ips,
                            },
                          },
                          {
                            path: ":id",
                            element: <IPDetailPage />,
                            handle: {
                              title: "IP detail",
                              permission: permissions.API.ips,
                            },
                          },
                        ],
                      },
                      {
                        path: "/partitions",
                        children: [
                          {
                            index: true,
                            element: <PartitionsPage />,
                            handle: {
                              title: "Partitions",
                              permission: permissions.API.partitions,
                            },
                          },
                          {
                            path: ":id",
                            element: <PartitionDetailPage />,
                            handle: {
                              title: "Partition detail",
                              permission: permissions.API.partitions,
                            },
                          },
                        ],
                      },
                      {
                        path: "/sizes",
                        children: [
                          {
                            index: true,
                            element: <SizesPage />,
                            handle: {
                              title: "Sizes",
                              permission: permissions.API.sizes,
                            },
                          },
                          {
                            path: ":id",
                            element: <SizeDetailPage />,
                            handle: {
                              title: "Size detail",
                              permission: permissions.API.sizes,
                            },
                          },
                        ],
                      },
                      {
                        path: "/networks",
                        children: [
                          {
                            index: true,
                            element: <NetworksPage />,
                            handle: {
                              title: "Networks",
                              permission: permissions.API.networks,
                            },
                          },
                          {
                            path: ":id",
                            element: <NetworkDetailPage />,
                            handle: {
                              title: "Network detail",
                              permission: permissions.API.networks,
                            },
                          },
                        ],
                      },
                      {
                        path: "/filesystems",
                        children: [
                          {
                            index: true,
                            element: <FilesystemsPage />,
                            handle: {
                              title: "Filesystems",
                              permission: permissions.API.filesystems,
                            },
                          },
                          {
                            path: ":id",
                            element: <FilesystemDetailPage />,
                            handle: {
                              title: "Filesystem detail",
                              permission: permissions.API.filesystems,
                            },
                          },
                        ],
                      },
                      {
                        path: "/tokens",
                        children: [
                          {
                            index: true,
                            element: <TokensPage />,
                            handle: {
                              title: "Tokens",
                              permission: permissions.API.tokens,
                            },
                          },
                          {
                            path: ":id",
                            element: <TokenDetailPage />,
                            handle: {
                              title: "Token detail",
                              permission: permissions.API.tokens,
                            },
                          },
                        ],
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
