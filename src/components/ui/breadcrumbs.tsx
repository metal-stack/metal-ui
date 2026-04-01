import * as React from "react"
import { Link, useLocation } from "react-router"
import { Separator } from "@/components/ui/separator"

export function Breadcrumbs() {
  const location = useLocation()
  const segments = location.pathname.split("/").filter(Boolean)

  if (segments.length === 0) return null

  return (
    <div className="flex items-center gap-2 text-sm mb-4">
      <Link
        to="/"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        Home
      </Link>
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1
        const path = `/${segments.slice(0, index + 1).join("/")}`

        if (isLast) {
          return (
            <span key={segment} className="text-foreground font-medium">
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </span>
          )
        }

        return (
          <React.Fragment key={segment}>
            <Separator orientation="vertical" className="h-4" />
            <Link
              to={path}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </Link>
          </React.Fragment>
        )
      })}
    </div>
  )
}
