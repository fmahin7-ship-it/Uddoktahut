/**
 * Brand tokens — matches login/signup (green-400 + green-900).
 * Spacing rhythm: ~40px section padding (not 80px double-gap feel).
 */
export const landing = {
  section: "scroll-mt-16 px-4 py-10 sm:px-6 lg:py-12",
  sectionMuted: "scroll-mt-16 bg-muted/40 px-4 py-10 sm:px-6 lg:py-12",
  sectionDark:
    "scroll-mt-16 bg-[#131619] px-4 py-10 text-zinc-100 sm:px-6 lg:py-12",
  container: "mx-auto w-full min-w-0 max-w-6xl",
  headerMb: "mb-8",
  grid: "grid gap-4",
  gradientText:
    "bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent",
  eyebrow:
    "mb-3 inline-flex items-center gap-2 rounded-full border border-green-400/40 bg-green-400/10 px-3.5 py-1 text-xs font-semibold text-green-700 dark:border-green-400/40 dark:text-green-400",
  eyebrowOnDark:
    "mb-3 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/15 px-3.5 py-1 text-xs font-semibold text-green-400",
  title:
    "text-2xl font-bold tracking-tight text-balance sm:text-3xl lg:text-[2rem] lg:leading-[1.2]",
  subtitle: "mt-3 text-base leading-relaxed text-pretty text-muted-foreground",
  subtitleOnDark: "mt-3 text-base leading-relaxed text-pretty text-zinc-400",
  body: "text-sm leading-relaxed text-muted-foreground",
  card:
    "rounded-2xl border border-green-400/20 bg-gradient-to-b from-green-400/[0.08] via-card to-card p-5 shadow-[0_2px_8px_rgba(36,174,124,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-green-400/40 hover:shadow-[0_8px_24px_rgba(36,174,124,0.12)] dark:border-border/80 dark:from-green-400/5 dark:shadow-sm",
  cardHighlight:
    "rounded-2xl border-2 border-green-400 bg-gradient-to-b from-green-400/15 via-card to-card p-5 shadow-[0_4px_20px_rgba(36,174,124,0.15)] ring-1 ring-green-400/25 dark:shadow-lg",
  btnPrimary:
    "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-400 px-6 py-3 text-sm font-semibold text-green-900 transition-colors hover:bg-[#05f27c] sm:w-auto",
  btnSecondary:
    "inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:border-green-400/50 hover:bg-green-400/5 sm:w-auto",
  iconBox:
    "flex h-10 w-10 items-center justify-center rounded-lg bg-green-400 text-green-900 shadow-sm shadow-green-400/25",
  divider: "mx-auto mt-4 h-0.5 w-12 rounded-full bg-green-400",
  pricingItem:
    "w-full flex-none sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] xl:w-[calc(20%-0.8rem)]",
};
