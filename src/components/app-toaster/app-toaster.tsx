import { Toaster } from "sonner";
import {
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      gap={10}
      icons={{
        success: <CheckCircle2 className="size-5 text-emerald-500" />,
        error: <XCircle className="size-5 text-red-500" />,
        info: <Info className="size-5 text-blue-500" />,
        warning: <AlertTriangle className="size-5 text-amber-500" />,
        loading: <Loader2 className="size-5 animate-spin text-zinc-400" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group w-full flex items-center gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm " +
            "bg-white/95 border-zinc-200 text-zinc-800 " +
            "dark:bg-zinc-900/95 dark:border-zinc-800 dark:text-zinc-100",
          title: "text-sm font-medium leading-tight",
          description:
            "text-sm text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5",
          icon: "shrink-0",
          content: "flex flex-col gap-0.5",
          actionButton:
            "ml-auto shrink-0 rounded-md px-2.5 py-1 text-xs font-medium " +
            "bg-zinc-900 text-white hover:bg-zinc-700 " +
            "dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors",
          cancelButton:
            "shrink-0 rounded-md px-2.5 py-1 text-xs font-medium " +
            "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 " +
            "dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-colors",
          closeButton:
            "border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900 " +
            "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white",

          // Varianten – farbiger Akzent über den linken Rand
          success: "border-l-4 !border-l-emerald-500",
          error: "border-l-4 !border-l-red-500",
          info: "border-l-4 !border-l-blue-500",
          warning: "border-l-4 !border-l-amber-500",
          loading: "border-l-4 !border-l-zinc-400",
        },
      }}
    />
  );
}
