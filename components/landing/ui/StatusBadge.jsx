import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const STYLES = {
  live: "bg-green-400/15 text-green-700 border-green-400/30 dark:text-green-400",
  beta: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300",
};

export function StatusBadge({ status, className }) {
  const t = useTranslations("Common.status");

  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold", STYLES[status], className)}>
      {t(status)}
    </span>
  );
}
