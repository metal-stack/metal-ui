import React from "react"
import { cn } from "@/lib/utils"

type InfoRow = {
  label: React.ReactNode
  value: React.ReactNode
  fullWidth?: boolean
}

type InfoGridProps = {
  rows: InfoRow[]
  className?: string
  labelClassName?: string
  valueClassName?: string
  responsive?: boolean
  emptyValue?: React.ReactNode
}

export function InfoGrid({
  rows,
  className,
  labelClassName = "font-semibold text-sm text-muted-foreground",
  valueClassName = "text-sm text-foreground break-words",
  responsive = true,
  emptyValue = "—",
}: InfoGridProps) {
  const gridCols = responsive
    ? "grid-cols-1 sm:grid-cols-[auto_1fr]"
    : "grid-cols-[auto_1fr]"

  const renderValue = (value: React.ReactNode) => {
    if (value === null || value === undefined || value === "") {
      return emptyValue
    }

    return value
  }

  return (
    <div
      className={cn(
        "grid gap-x-4 gap-y-3",
        gridCols,
        className
      )}
    >
      {rows.map((row, idx) => {
        const key =
          typeof row.label === "string" ? row.label : idx

        if (row.fullWidth) {
          return (
            <React.Fragment key={key}>
              <div
                className={cn("col-span-2 sm:col-span-2 font-semibold text-base", labelClassName)}
              >
                {row.label}
              </div>
              <div className={cn("col-span-2 sm:col-span-2", valueClassName)}>
                {renderValue(row.value)}
              </div>
            </React.Fragment>
          )
        }

        return (
          <React.Fragment key={key}>
            <div className={cn("flex items-center gap-2", labelClassName)}>
              {row.label}
            </div>
            <div className={cn(valueClassName)}>{renderValue(row.value)}</div>
          </React.Fragment>
        )
      })}
    </div>
  )
}
