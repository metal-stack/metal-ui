import { Tenant } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { InfoGrid } from "../info-grid/info-grid";
import { TimeStampPill } from "../ui/timeStamp-pill";
import { CopyText } from "../ui/copy-text";

interface TenantsInfoProps {
  data: Tenant;
}

export default function TenantInfo({ data }: TenantsInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "Login:", value: <CopyText text={data.login} /> },
        { label: "Name:", value: data.name },
        {
          label: "Description:",
          value: data.description || "—",
        },
        { label: "Email:", value: data.email },
        {
          label: "Created at:",
          value: data.meta?.createdAt ? (
            <TimeStampPill date={timestampDate(data.meta.createdAt)} />
          ) : undefined,
        },
        {
          label: "Updated at:",
          value: data.meta?.updatedAt ? (
            <TimeStampPill date={timestampDate(data.meta.updatedAt)} />
          ) : undefined,
        },
      ]}
    />
  );
}
