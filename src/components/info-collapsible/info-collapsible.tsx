import * as React from "react";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { Separator } from "../ui/separator";

type InfoCollapsibleProps = {
  title: string;
  children?: React.ReactNode;
};

export default function InfoCollapsible({
  title,
  children,
}: InfoCollapsibleProps) {
  const [open, onOpenChange] = React.useState(false);
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-md font-semibold text-primary">{title}: </h4>

        {children ? (
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-4">
              <ChevronsUpDown />
            </Button>
          </CollapsibleTrigger>
        ) : (
          <span className="text-sm text-muted-foreground">No data</span>
        )}
      </div>

      {open && <Separator className="my-2" />}
      <CollapsibleContent className="ml-4">{children}</CollapsibleContent>
    </Collapsible>
  );
}
