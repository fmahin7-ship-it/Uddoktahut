"use client";

import Link from "next/link";
import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function ModernDarkSectionHeading({
  title,
  subtitle,
  actionHref,
  actionLabel,
}) {
  const { colors, headingStyle } = useStoreTheme();

  return (
    <div className="text-center mb-12">
      <h2
        className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4"
        style={{ color: colors.text, ...headingStyle }}
      >
        {title}
      </h2>
      <div className="w-24 h-1 mx-auto mb-4" style={{ backgroundColor: colors.accent }} />
      {subtitle && (
        <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: colors.textSecondary }}>
          {subtitle}
        </p>
      )}
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-block mt-4 text-sm font-bold uppercase tracking-widest hover:underline underline-offset-4"
          style={{ color: colors.accent }}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
