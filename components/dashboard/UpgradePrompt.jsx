import Link from "next/link";
import { Sparkles, Package, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UpgradePrompt({
  title = "Upgrade required",
  description,
  icon = "sparkles",
  ctaHref = "/dashboard/settings",
  ctaLabel = "View plans",
}) {
  const Icon = icon === "package" ? Package : icon === "billing" ? CreditCard : Sparkles;

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-green-300/60 bg-green-50/50 dark:bg-green-950/20 px-6 py-16 text-center">
      <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/40">
        <Icon className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      <Button asChild className="mt-6">
        <Link href={ctaHref}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}
