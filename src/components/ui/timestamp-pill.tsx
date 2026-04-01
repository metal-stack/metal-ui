import { Badge } from "./badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { timestampDate, Timestamp } from "@bufbuild/protobuf/wkt";
import { IconCalendar } from "@tabler/icons-react";

interface TimestampPillProps {
  timestamp?: Timestamp;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "destructive";
}

export function TimestampPill({
  timestamp,
  className = "",
  variant = "outline",
}: TimestampPillProps) {
  if (!timestamp) {
    return <Badge variant={variant}>No date</Badge>;
  }

  const date = timestampDate(timestamp);
  const now = new Date();

  // Absolute display (default) - full date and time
  const absoluteText = date.toLocaleString();
  
  // Relative calculation for tooltip
  const getRelativeText = () => {
    let timeDiffMs = now.getTime() - date.getTime();
    const seconds = Math.floor(Math.abs(timeDiffMs) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years}y ago`;
    } else if (months > 0) {
      return `${months}mo ago`;
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return "Just now";
    }
  };

  const relativeText = getRelativeText();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={variant} className={`gap-1.5 font-normal ${className}`}>
            <IconCalendar className="w-3 h-3 shrink-0" />
            <span className="whitespace-nowrap">{absoluteText}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{relativeText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
