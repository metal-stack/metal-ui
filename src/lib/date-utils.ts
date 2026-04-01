export function formatRelativeTime(date: Date): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (Math.abs(diffSeconds) < 60) {
    return rtf.format(-diffSeconds, "second");
  }
  if (Math.abs(diffMinutes) < 60) {
    return rtf.format(-diffMinutes, "minute");
  }
  if (Math.abs(diffHours) < 24) {
    return rtf.format(-diffHours, "hour");
  }
  if (Math.abs(diffDays) < 7) {
    return rtf.format(-diffDays, "day");
  }
  if (Math.abs(diffDays) < 30) {
    return rtf.format(-Math.floor(diffDays / 7), "week");
  }
  if (Math.abs(diffDays) < 365) {
    return rtf.format(-Math.floor(diffDays / 30), "month");
  }
  
  return rtf.format(-Math.floor(diffDays / 365), "year");
}

export function formatTimestamp(date: Date): string {
  return date.toLocaleString();
}

export function formatTimestampDate(date: Date): string {
  return new Intl.DateTimeFormat("default", {
    dateStyle: "medium",
  }).format(date);
}

export function formatTimestampTime(date: Date): string {
  return new Intl.DateTimeFormat("default", {
    timeStyle: "short",
  }).format(date);
}
