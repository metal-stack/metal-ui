import { useState, useEffect } from "react";
import { IconCalendarTime } from "@tabler/icons-react";
import { formatRelativeTime, formatTimestampDate, formatTimestampTime } from "@/lib/date-utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TimeStampPillProps {
  date: Date;
  className?: string;
}

export function TimeStampPill({ date, className }: TimeStampPillProps) {
  const [relativeTime, setRelativeTime] = useState<string>("");

  useEffect(() => {
    setRelativeTime(formatRelativeTime(date));

    const interval = setInterval(() => {
      setRelativeTime(formatRelativeTime(date));
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 ${className}`}>
          <IconCalendarTime className="size-3" />
          <span>{formatTimestampDate(date)}</span>
          <span className="text-muted-foreground">•</span>
          <span>{formatTimestampTime(date)}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>{relativeTime}</TooltipContent>
    </Tooltip>
  );
}
