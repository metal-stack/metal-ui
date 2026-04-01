import * as React from "react";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { Card, CardContent } from "../ui/card";

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
    <Collapsible open={open} onOpenChange={onOpenChange} className="w-full">
      <Card className="w-full">
        {children ? (
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between px-4 cursor-pointer transition-colors">
              <h4 className="text-lg font-semibold">{title}</h4>
              {open ? (
                <IconChevronUp className="size-5 text-muted-foreground" />
              ) : (
                <IconChevronDown className="size-5 text-muted-foreground" />
              )}
            </div>
          </CollapsibleTrigger>
        ) : (
          <div className="flex items-center justify-between px-4 cursor-pointer hover:bg-accent/50 transition-colors">
            <h4 className="text-lg font-semibold">{title}</h4>
            <span className="text-sm text-muted-foreground">No data</span>
          </div>
        )}
        <CollapsibleContent>
          <CardContent className="pt-0">{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
