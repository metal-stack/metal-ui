export const permissions = {
  API: {
    tenants: [
      "/metalstack.api.v2.TenantService/List",
      "/metalstack.api.v2.TenantService/Get",
    ],
    projects: [
      "/metalstack.api.v2.ProjectService/List",
      "/metalstack.api.v2.ProjectService/Get",
    ],
    partitions: [
      "/metalstack.api.v2.PartitionService/List",
      "/metalstack.api.v2.PartitionService/Get",
    ],
    machines: [
      "/metalstack.api.v2.MachineService/Get",
      "/metalstack.api.v2.MachineService/List",
    ],
    sizes: [
      "/metalstack.api.v2.SizeService/List",
      "/metalstack.api.v2.SizeService/Get",
    ],
    images: [
      "/metalstack.api.v2.ImageService/List",
      "/metalstack.api.v2.ImageService/Get",
    ],
    ips: [
      "/metalstack.api.v2.IPService/List",
      "/metalstack.api.v2.IPService/Get",
    ],
    networks: [
      "/metalstack.api.v2.NetworkService/List",
      "/metalstack.api.v2.NetworkService/Get",
    ],
    filesystems: [
      "/metalstack.api.v2.FileSystemService/List",
      "/metalstack.api.v2.FileSystemService/Get",
    ],
    tokens: [
      "/metalstack.api.v2.TokenService/List",
      "/metalstack.api.v2.TokenService/Get",
    ],
  },
  ADMIN: {
    tenants: ["/metalstack.admin.v2.TenantService/List"],
    projects: ["/metalstack.admin.v2.ProjectService/List"],
    machines: [
      "/metalstack.admin.v2.MachineService/List",
      "/metalstack.admin.v2.MachineService/Get",
    ],
    ips: ["/metalstack.admin.v2.IPService/List"],
    networks: [
      "/metalstack.admin.v2.NetworkService/List",
      "/metalstack.admin.v2.NetworkService/Get",
    ],
    switches: [
      "/metalstack.admin.v2.SwitchService/List",
      "/metalstack.admin.v2.SwitchService/Get",
    ],
  },
};
