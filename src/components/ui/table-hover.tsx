import { cn } from "@/lib/utils"

export function TableHover({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("overflow-hidden rounded-lg border shadow-sm", className)}>
      <div className="relative">
        <div className="overflow-x-auto">
          <div className="min-w-full">{children}</div>
        </div>
      </div>
    </div>
  )
}
