/**
 * Shimmer skeleton that mirrors ProductCard's layout exactly:
 * off-white h-56 image tile, category eyebrow, 2-line title, price.
 * Uses the shared `.skeleton` class from globals.css (left-to-right
 * shimmer at 1.6s, respects prefers-reduced-motion).
 */
export default function ProductCardSkeleton({ variant = "default" }) {
  const isHero = variant === "hero";
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#141414] via-[#0f0f0f] to-[#0A0A0A] shadow-2xl shadow-black/50 ${
        isHero ? "h-full" : ""
      }`}
    >
      {/* Image tile */}
      <div className={`skeleton !rounded-none bg-zinc-200/5 ${isHero ? "h-[520px]" : "h-56"}`} />

      {/* Body */}
      <div className="space-y-3 p-5">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="skeleton h-3 w-24" />
        </div>
        {/* Category eyebrow */}
        <div className="skeleton h-2.5 w-16 rounded-full" />
        {/* Title (2 lines) */}
        <div className="space-y-2">
          <div className="skeleton h-4 w-4/5" />
          <div className="skeleton h-4 w-2/3" />
        </div>
        {/* Price */}
        <div className="skeleton mt-1 h-7 w-28" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, columns = 4 }) {
  const gridClass =
    columns === 3
      ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
