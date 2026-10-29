"use client";

import type { SectionHeadingProps } from "@/features/storefront/types";
import Link from "next/link";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";

export default function BoutiqueSectionHeading({
  title,
  subtitle,
  actionHref,
  actionLabel,
}: SectionHeadingProps) {
  const { colors, headingStyle } = useStoreTheme();

  return (
    <div className="text-center mb-12">
      <h2
        className="text-3xl sm:text-4xl italic mb-3"
        style={{ color: colors.accent, ...headingStyle }}
      >
        {title}
      </h2>
      <div className="w-16 h-px mx-auto mb-4" style={{ backgroundColor: colors.border }} />
      {subtitle && (
        <p className="text-sm sm:text-base" style={{ color: colors.textSecondary }}>
          {subtitle}
        </p>
      )}
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-block mt-4 text-sm italic hover:underline underline-offset-4"
          style={{ color: colors.accent }}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
