import * as React from "react";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

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
    <Collapsible
      className="border border-border rounded-md p-4 border-primary"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-sm font-semibold">{title}: </h4>

        {children ? (
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronsUpDown />
            </Button>
          </CollapsibleTrigger>
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </div>

      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
