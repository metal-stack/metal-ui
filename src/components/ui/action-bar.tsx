import { cn } from "@/lib/utils"

interface ActionBarProps {
  children: React.ReactNode
  className?: string
  alignment?: "left" | "center" | "right"
}

export function ActionBar({
  children,
  className,
  alignment = "right",
}: ActionBarProps) {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        alignmentClasses[alignment],
        className
      )}
    >
      {children}
    </div>
  )
}
