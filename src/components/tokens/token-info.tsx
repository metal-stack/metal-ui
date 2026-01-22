import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { useState } from "react";
import { CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Token,
  TokenType,
} from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import CodeBlock from "../code-block/code-block";

interface TokenInfoProps {
  data?: Token;
  asCollapse?: boolean;
}

export default function TokenInfo({ data, asCollapse }: TokenInfoProps) {
  const [open, setOpen] = useState(false);

  const content = (
    <div className="flex flex-col gap-2">
      <div>
        <strong>ID:</strong> {data?.uuid || "-"}
      </div>
      <div>
        <strong>Description:</strong> {data?.description || "-"}
      </div>
      <div>
        <strong>Expires:</strong>{" "}
        {data?.expires ? data.expires.toString() : "-"}
      </div>
      <div>
        <strong>Issued at:</strong>{" "}
        {data?.issuedAt ? data.issuedAt.toString() : "-"}
      </div>
      <div>
        <strong>Token type:</strong>{" "}
        {data?.tokenType ? TokenType[data.tokenType] : "-"}
      </div>
      <CodeBlock
        title="Token scope"
        data={{
          ...data?.permissions,
          ...data?.projectRoles,
          ...data?.tenantRoles,
          adminRole: data?.adminRole,
          infraRole: data?.infraRole,
        }}
      />
    </div>
  );

  if (asCollapse) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-sm font-semibold">Size: </h4>
          {data ? (
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronsUpDown />
              </Button>
            </CollapsibleTrigger>
          ) : (
            "-"
          )}
        </div>
        <CollapsibleContent className="border border-border rounded-md p-4">
          {content}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return content;
}
