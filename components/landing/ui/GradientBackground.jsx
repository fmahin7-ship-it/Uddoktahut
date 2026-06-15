export function GradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-green-400/15 blur-3xl" />
      <div className="absolute -right-16 top-32 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(36,174,124,0.08),transparent_55%)]" />
    </div>
  );
}
