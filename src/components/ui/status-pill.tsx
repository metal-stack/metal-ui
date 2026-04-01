import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusPillVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all",
  {
    variants: {
      variant: {
        online: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20",
        offline: "bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-1 ring-slate-500/20",
        warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20",
        error: "bg-red-500/10 text-red-600 dark:text-red-400 ring-1 ring-red-500/20",
        pending: "bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20",
        default: "bg-muted text-muted-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface StatusPillProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof statusPillVariants> {
  status?: "online" | "offline" | "warning" | "error" | "pending"
  label?: string
}

export function StatusPill({
  className,
  variant,
  size,
  status,
  label,
  ...props
}: StatusPillProps) {
  return (
    <div
      data-slot="status-pill"
      className={cn(
        statusPillVariants({ variant: status || variant, size }),
        className
      )}
      {...props}
    >
      {status && (
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            status === "online" && "bg-emerald-500 animate-pulse",
            status === "offline" && "bg-slate-500",
            status === "warning" && "bg-amber-500 animate-pulse",
            status === "error" && "bg-red-500",
            status === "pending" && "bg-blue-500"
          )}
        />
      )}
      {label}
    </div>
  )
}

export function BadgeStatus({
  className,
  variant,
  size,
  status,
  label,
  ...props
}: StatusPillProps) {
  return (
    <div
      data-slot="badge-status"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        status === "online" && "bg-emerald-500 text-white",
        status === "offline" && "bg-slate-500 text-white",
        status === "warning" && "bg-amber-500 text-white",
        status === "error" && "bg-red-500 text-white",
        status === "pending" && "bg-blue-500 text-white",
        className
      )}
      {...props}
    >
      {status && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            status === "online" && "bg-white",
            status === "offline" && "bg-white/70",
            status === "warning" && "bg-white",
            status === "error" && "bg-white",
            status === "pending" && "bg-white"
          )}
        />
      )}
      {label}
    </div>
  )
}
