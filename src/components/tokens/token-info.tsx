import {
  Token,
  TokenType,
} from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import CodeBlock from "../code-block/code-block";

interface TokenInfoProps {
  data: Token;
}

export default function TokenInfo({ data }: TokenInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>ID:</strong> {data.uuid}
      </div>
      <div>
        <strong>Description:</strong> {data.description}
      </div>
      <div>
        <strong>Expires:</strong> {data.expires?.toString() ?? "-"}
      </div>
      <div>
        <strong>Issued at:</strong> {data.issuedAt?.toString() ?? "-"}
      </div>
      <div>
        <strong>Token type:</strong> {TokenType[data.tokenType]}
      </div>
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
    </div>
  );
}
