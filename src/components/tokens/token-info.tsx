import {
  Token,
  TokenType,
} from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import CodeBlock from "../code-block/code-block";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { InfoGrid } from "../info-grid/info-grid";
import { TimeStampPill } from "../ui/timeStamp-pill";
import { CopyText } from "../ui/copy-text";

interface TokenInfoProps {
  data: Token;
}

export default function TokenInfo({ data }: TokenInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "ID:", value: <CopyText text={data.uuid} /> },
        { label: "Description:", value: data.description },
        {
          label: "Expires:",
          value: (
            <TimeStampPill
              date={data.expires ? timestampDate(data.expires) : new Date()}
            />
          ),
        },
        {
          label: "Issued at:",
          value: (
            <TimeStampPill
              date={data.issuedAt ? timestampDate(data.issuedAt) : new Date()}
            />
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
