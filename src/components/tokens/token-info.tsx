import {
  Token,
  TokenType,
} from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import CodeBlock from "../code-block/code-block";
import { InfoGrid } from "../info-grid/info-grid";
import { CopyableText } from "../ui/copyable-text";
import { TimestampPill } from "../ui/timestamp-pill";

interface TokenInfoProps {
  data: Token;
}

export default function TokenInfo({ data }: TokenInfoProps) {
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

  const permissionList = data.permissions?.map((p) => p.methods?.join(", ") || "-").join(", ") || "-";
  const projectRoleMap = Object.entries(data.projectRoles || {}).map(
    ([key, value]) => `${key}: ${value}`
  );
  const tenantRoleMap = Object.entries(data.tenantRoles || {}).map(
    ([key, value]) => `${key}: ${value}`
  );
  const machineRoleMap = Object.entries(data.machineRoles || {}).map(
    ([key, value]) => `${key}: ${value}`
  );

  const scopeData = {
    permissions: permissionList,
    ...data.projectRoles,
    ...data.tenantRoles,
    adminRole: data.adminRole,
    infraRole: data.infraRole,
    ...data.machineRoles,
  };

  return (
    <div className="flex flex-col gap-2">
      <InfoGrid rows={metaFields} />
      <InfoGrid
        rows={[
          { label: "ID:", value: <CopyableText text={data.uuid} variant="inline" /> },
          { label: "User:", value: data.user ? <CopyableText text={data.user} variant="inline" /> : "-" },
          { label: "Description:", value: data.description },
          {
            label: "Expires:",
            value: data.expires ? <TimestampPill timestamp={data.expires} /> : "—",
          },
          {
            label: "Issued at:",
            value: data.issuedAt ? <TimestampPill timestamp={data.issuedAt} /> : "—",
          },
          {
            label: "Token type:",
            value: TokenType[data.tokenType],
          },
          {
            label: "Permissions",
            value: <CopyableText text={permissionList} variant="block" />,
            fullWidth: true,
          },
          {
            label: "Project Roles",
            value: projectRoleMap.length ? (
              <div className="flex flex-col gap-1 ml-4">
                {projectRoleMap.map((role, index) => (
                  <div key={index}>{role}</div>
                ))}
              </div>
            ) : (
              "-"
            ),
            fullWidth: true,
          },
          {
            label: "Tenant Roles",
            value: tenantRoleMap.length ? (
              <div className="flex flex-col gap-1 ml-4">
                {tenantRoleMap.map((role, index) => (
                  <div key={index}>{role}</div>
                ))}
              </div>
            ) : (
              "-"
            ),
            fullWidth: true,
          },
          {
            label: "Machine Roles",
            value: machineRoleMap.length ? (
              <div className="flex flex-col gap-1 ml-4">
                {machineRoleMap.map((role, index) => (
                  <div key={index}>{role}</div>
                ))}
              </div>
            ) : (
              "-"
            ),
            fullWidth: true,
          },
          {
            label: "Admin Role",
            value: data.adminRole || "-",
          },
          {
            label: "Infra Role",
            value: data.infraRole || "-",
          },
          {
            label: "Token scope",
            value: (
              <CodeBlock
                title="Token scope"
                data={scopeData}
              />
            ),
            fullWidth: true,
          },
        ]}
      />
    </div>
  );
}
