import CodeBlock from "@/components/code-block/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMethods } from "@/providers/MethodsProvider";
import { TriangleAlertIcon } from "lucide-react";

export default function Dashboard() {
  const methodsCtx = useMethods();

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Alert className="text-primary-foreground bg-primary">
        <TriangleAlertIcon />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription className="text-primary-foreground">
          This ui is under construction.
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
