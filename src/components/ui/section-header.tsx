import { cn } from "@/lib/utils"

export function SectionHeader({
  title,
  description,
  className,
  action,
}: {
  title: string
  description?: string
  className?: string
  action?: React.ReactNode
}) {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  )
}
