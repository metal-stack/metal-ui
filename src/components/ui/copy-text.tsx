import { useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface CopyTextProps {
  text: string;
  className?: string;
}

export function CopyText({ text, className }: CopyTextProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="font-mono text-sm">{text}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={handleCopy}
        title="Copy to clipboard"
      >
        {copied ? (
          <IconCheck className="size-3 text-green-500" />
        ) : (
          <IconCopy className="size-3" />
        )}
      </Button>
    </div>
  );
}
