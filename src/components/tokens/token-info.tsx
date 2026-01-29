import {
  Token,
  TokenType,
} from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import CodeBlock from "../code-block/code-block";
import { Badge } from "../ui/badge";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { IconCalendar } from "@tabler/icons-react";
import { InfoGrid } from "../info-grid/info-grid";

interface TokenInfoProps {
  data: Token;
}

export default function TokenInfo({ data }: TokenInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "ID:", value: data.uuid },
        { label: "Description:", value: data.description },
        {
          label: "Expires:",
          value: (
            <Badge variant="outline">
              <IconCalendar />
              {data.expires ? timestampDate(data.expires).toISOString() : null}
            </Badge>
          ),
        },
        {
          label: "Issued at:",
          value: (
            <Badge variant="outline">
              <IconCalendar />
              {data.issuedAt
                ? timestampDate(data.issuedAt).toISOString()
                : null}
            </Badge>
          ),
        },
        {
          label: "Token type:",
          value: TokenType[data.tokenType],
        },
        {
          label: "Token scope",
          value: (
            <CodeBlock
              title="Token scope"
              data={{
                ...data.permissions,
                ...data.projectRoles,
                ...data.tenantRoles,
                adminRole: data.adminRole,
                infraRole: data.infraRole,
              }}
            />
          ),
          fullWidth: true,
        },
      ]}
    />
  );
}
