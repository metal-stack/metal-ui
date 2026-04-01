import { ComponentProps } from "react"

interface PermissionGuardProps extends ComponentProps<"div"> {
  requiredPermissions?: string[]
  children: React.ReactNode
}

export function PermissionGuard({
  children,
}: PermissionGuardProps) {
  return <>{children}</>
}
