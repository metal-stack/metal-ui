import { Badge } from "./badge";
import { timestampDate, Timestamp } from "@bufbuild/protobuf/wkt";
import { IconCalendar } from "@tabler/icons-react";

interface TimestampPillProps {
  timestamp?: Timestamp;
  format?: "relative" | "absolute" | "short";
  className?: string;
  variant?: "default" | "secondary" | "outline" | "destructive";
}

export function TimestampPill({
  timestamp,
  format = "relative",
  className = "",
  variant = "outline",
}: TimestampPillProps) {
  if (!timestamp) {
    return <Badge variant={variant}>No date</Badge>;
  }

  const date = timestampDate(timestamp);
  const now = new Date();

  let displayText = "";
  let timeDiffMs = 0;

  if (format === "relative") {
    timeDiffMs = now.getTime() - date.getTime();
    const seconds = Math.floor(Math.abs(timeDiffMs) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      displayText = `${years}y ago`;
    } else if (months > 0) {
      displayText = `${months}mo ago`;
    } else if (days > 0) {
      displayText = `${days}d ago`;
    } else if (hours > 0) {
      displayText = `${hours}h ago`;
    } else if (minutes > 0) {
      displayText = `${minutes}m ago`;
    } else {
      displayText = "Just now";
    }

    if (timeDiffMs < 0) {
      displayText = `in ${displayText.replace("ago", "")}`;
    }
  } else if (format === "short") {
    displayText = date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "2-digit",
    });
  } else {
    displayText = date.toLocaleString();
  }

  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (format === "relative") {
    if (isToday) {
      displayText = "Today " + date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    } else if (isYesterday) {
      displayText = "Yesterday " + date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    }
  }

  return (
    <Badge variant={variant} className={`gap-1.5 font-normal ${className}`}>
      <IconCalendar className="w-3 h-3 shrink-0" />
      <span className="whitespace-nowrap">{displayText}</span>
    </Badge>
  );
}
