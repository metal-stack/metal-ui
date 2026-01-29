import { Tenant } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { InfoGrid } from "../info-grid/info-grid";

interface TenantsInfoProps {
  data: Tenant;
}

export default function TenantInfo({ data }: TenantsInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "Login:", value: data.login },
        { label: "Name:", value: data.name },
        {
          label: "Description:",
          value: data.description || "—",
        },
        { label: "Email:", value: data.email },
      ]}
    />
  );
}
