import { IconCopy } from "@tabler/icons-react";
import { Button } from "../ui/button";

interface CodeBlockProps {
  data: any;
  title: string;
}

export default function CodeBlock({ data, title }: CodeBlockProps) {
  let jsonString: string;
  try {
    jsonString = JSON.stringify(data, null, 2);
  } catch (error) {
    jsonString = String(data);
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(jsonString);
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-300 px-4 py-2 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h3>
        <Button size="sm" variant="outline" onClick={copyToClipboard}>
          <IconCopy />
        </Button>
      </div>
      <pre className="overflow-x-auto bg-slate-950 px-4 py-3 text-xs font-mono leading-relaxed text-slate-100 rounded-b-lg">
        {jsonString}
      </pre>
    </div>
  );
}
