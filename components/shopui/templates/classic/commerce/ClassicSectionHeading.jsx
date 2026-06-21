"use client";

import Link from "next/link";
import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function ClassicSectionHeading({
  title,
  subtitle,
  actionHref,
  actionLabel,
}) {
  const { colors, headingStyle } = useStoreTheme();

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
      <div>
        <h2
          className="text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ color: colors.text, ...headingStyle }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm sm:text-base" style={{ color: colors.textSecondary }}>
            {subtitle}
          </p>
        )}
      </div>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="text-sm font-semibold hover:underline underline-offset-4 shrink-0"
          style={{ color: colors.accent }}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
