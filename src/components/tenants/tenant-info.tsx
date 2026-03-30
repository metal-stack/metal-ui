import { Tenant } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { InfoGrid } from "../info-grid/info-grid";
import { timestampDate } from "@bufbuild/protobuf/wkt";

interface TenantInfoProps {
  data: Tenant;
}

export default function TenantInfo({ data }: TenantInfoProps) {
  const metaFields = [];
  if (data.meta?.labels?.labels) {
    const labels = Object.entries(data.meta.labels.labels).map(
      ([key, value]) => `${key}=${value}`
    );
    metaFields.push({ label: "Labels:", value: labels.join(", ") });
  }
  if (data.meta?.createdAt) {
    metaFields.push({
      label: "Created at:",
      value: timestampDate(data.meta.createdAt).toLocaleString(),
    });
  }
  if (data.meta?.updatedAt) {
    metaFields.push({
      label: "Updated at:",
      value: timestampDate(data.meta.updatedAt).toLocaleString(),
    });
  }
  if (data.meta?.generation !== undefined) {
    metaFields.push({ label: "Generation:", value: data.meta.generation });
  }

  return (
    <div className="flex flex-col gap-2">
      <InfoGrid rows={metaFields} />
      <InfoGrid
        rows={[
          { label: "Login:", value: data.login },
          { label: "Name:", value: data.name },
          {
            label: "Description:",
            value: data.description || "—",
          },
          { label: "Email:", value: data.email || "—" },
          { label: "Avatar URL:", value: data.avatarUrl || "—" },
          { label: "Created by:", value: data.createdBy || "—" },
        ]}
      />
    </div>
  );
}
