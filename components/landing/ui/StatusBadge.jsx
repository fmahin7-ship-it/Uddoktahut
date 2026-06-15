import { cn } from "@/lib/utils";

const STYLES = {
  live: "bg-green-400/15 text-green-700 border-green-400/30 dark:text-green-400",
  beta: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300",
  soon: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300",
  roadmap: "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300",
};

const LABELS = { live: "Live", beta: "Beta", soon: "Coming soon", roadmap: "Roadmap" };

export function StatusBadge({ status, className }) {
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold", STYLES[status], className)}>
      {LABELS[status]}
    </span>
  );
}
