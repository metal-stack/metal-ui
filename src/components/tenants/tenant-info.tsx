import { Section } from "@/components/ui/section/section";
import { Tenant } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { InfoGrid } from "../info-grid/info-grid";

interface TenantsInfoProps {
  data: Tenant;
  title?: string;
}

export default function TenantInfo({
  data,
  title = "Details",
}: TenantsInfoProps) {
  return (
    <Section title={title}>
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
    </Section>
  );
}
