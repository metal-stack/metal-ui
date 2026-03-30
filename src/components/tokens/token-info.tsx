import {
  Token,
  TokenType,
} from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import CodeBlock from "../code-block/code-block";
import { Badge } from "../ui/badge";
import { InfoGrid } from "../info-grid/info-grid";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { IconCalendar } from "@tabler/icons-react";

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
          { label: "ID:", value: data.uuid },
          { label: "User:", value: data.user },
          { label: "Description:", value: data.description },
          {
            label: "Expires:",
            value: (
              <Badge variant="outline">
                <IconCalendar />
                {data.expires
                  ? timestampDate(data.expires).toLocaleString()
                  : "—"}
              </Badge>
            ),
          },
          {
            label: "Issued at:",
            value: (
              <Badge variant="outline">
                <IconCalendar />
                {data.issuedAt
                  ? timestampDate(data.issuedAt).toLocaleString()
                  : "—"}
              </Badge>
            ),
          },
          {
            label: "Token type:",
            value: TokenType[data.tokenType],
          },
          {
            label: "Permissions",
            value: permissionList,
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
