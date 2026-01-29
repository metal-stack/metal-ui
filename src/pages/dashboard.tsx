import CodeBlock from "@/components/code-block/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMethods } from "@/providers/MethodsProvider";
import { TriangleAlertIcon } from "lucide-react";

export default function Dashboard() {
  const methodsCtx = useMethods();

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Alert className="border border-border bg-muted text-foreground">
        <TriangleAlertIcon className="h-4 w-4 !text-primary" />

        <AlertTitle className="text-primary">Warning</AlertTitle>
        <AlertDescription className="inline">
          This UI is under construction. It builds on top of the Metal API with{" "}
          <a
            className="inline underline underline-offset-2 hover:text-primary"
            rel="noopener noreferrer"
            target="_blank"
            href="https://metal-stack.io/docs/MEP-4-multi-tenancy-for-the-metal-api"
          >
            MEP-4
          </a>
          .
        </AlertDescription>
      </Alert>
      <CodeBlock data={methodsCtx.tokenScope} title="Token scope" />
      <CodeBlock
        data={methodsCtx.methodsPermissions}
        title="Methods permissions"
      />
    </div>
  );
}
