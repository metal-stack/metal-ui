import { Tenant } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { InfoGrid } from "../info-grid/info-grid";
import { CopyableText } from "../ui/copyable-text";
import { TimestampPill } from "../ui/timestamp-pill";

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
      value: <TimestampPill timestamp={data.meta.createdAt} />,
    });
  }
  if (data.meta?.updatedAt) {
    metaFields.push({
      label: "Updated at:",
      value: <TimestampPill timestamp={data.meta.updatedAt} />,
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
          {
            label: "Login:",
            value: <CopyableText text={data.login} variant="inline" />,
          },
          { label: "Name:", value: data.name },
          {
            label: "Description:",
            value: data.description || "—",
          },
          {
            label: "Email:",
            value: data.email ? <CopyableText text={data.email} variant="inline" /> : "—",
          },
          {
            label: "Avatar URL:",
            value: data.avatarUrl ? <CopyableText text={data.avatarUrl} variant="block" /> : "—",
          },
          {
            label: "Created by:",
            value: data.createdBy ? <CopyableText text={data.createdBy} variant="inline" /> : "—",
          },
        ]}
      />
    </div>
  );
}
