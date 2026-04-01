import * as React from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"

interface CopyButtonProps {
  text: string
  variant?: "ghost" | "outline" | "secondary"
  size?: "sm" | "icon" | "default"
  className?: string
  copySuccessText?: string
}

export function CopyButton({
  text,
  variant = "ghost",
  size = "icon",
  className,
  copySuccessText = "Copied!",
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      toast.success(copySuccessText)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    })
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={className}
      title="Copy to clipboard"
    >
      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}
