export function GradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-green-400/12 blur-2xl sm:h-72 sm:w-72 sm:bg-green-400/15 sm:blur-3xl" />
      <div className="absolute -right-16 top-32 h-48 w-48 rounded-full bg-green-500/8 blur-2xl sm:h-64 sm:w-64 sm:bg-green-500/10 sm:blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(36,174,124,0.08),transparent_55%)]" />
    </div>
  );
}
