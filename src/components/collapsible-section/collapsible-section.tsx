import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface CollapsibleSectionProps {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export default function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false,
  className,
}: CollapsibleSectionProps) {
  return (
    <Collapsible defaultOpen={defaultOpen} className={className}>
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 rounded-lg border bg-muted px-4 py-3 text-base font-semibold transition-colors hover:bg-muted/80 [&[data-state=open]>svg:last-child]:rotate-180">
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        <ChevronDown className="size-5 shrink-0 transition-transform" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-b-lg border-x border-b bg-card p-4">
          {children ?? (
            <span className="text-sm text-muted-foreground">No data</span>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
