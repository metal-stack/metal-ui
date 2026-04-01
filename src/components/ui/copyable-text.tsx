import { CopyButton } from "./copy-button"
import { cn } from "@/lib/utils"

interface CopyableTextProps {
  text: string
  className?: string
  variant?: "inline" | "block"
}

export function CopyableText({
  text,
  className,
  variant = "inline",
}: CopyableTextProps) {
  if (variant === "block") {
    return (
      <div className={cn("relative group rounded-lg border bg-muted/30 p-3", className)}>
        <div className="pr-10 font-mono text-sm text-foreground break-all">
          {text}
        </div>
        <div className="absolute right-2 top-2">
          <CopyButton text={text} variant="ghost" size="sm" className="h-8 w-8" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-2 font-mono text-sm", className)}>
      <span className="text-foreground break-all">{text}</span>
      <CopyButton text={text} variant="ghost" size="sm" className="h-6 w-6" />
    </div>
  )
}
