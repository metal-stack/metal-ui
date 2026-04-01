import * as React from "react";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

type InfoCollapsibleProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export default function InfoCollapsible({
  title,
  children,
  className,
}: InfoCollapsibleProps) {
  const [open, onOpenChange] = React.useState(false);
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <div className={cn("flex items-center justify-between gap-4 py-3", className)}>
        <h4 className="text-base font-semibold text-foreground">{title}</h4>

        {children ? (
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 shrink-0">
              <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        ) : (
          <span className="text-sm text-muted-foreground">No data</span>
        )}
      </div>

      {open && <Separator className="my-4" />}
      <CollapsibleContent>
        <div className="ml-4">{children}</div>
      </CollapsibleContent>
      {open && <Separator className="my-4" />}
    </Collapsible>
  );
}
