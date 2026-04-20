import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";

export default function ShopLoading() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 space-y-5">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton h-12 w-48 md:h-16 md:w-64" />
          <div className="skeleton h-4 w-60" />
        </div>

        {/* Filter row placeholder */}
        <div className="mb-10 flex flex-wrap gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="skeleton h-8 w-20 rounded-full" />
          ))}
        </div>

        <ProductGridSkeleton count={12} />
      </div>
    </section>
  );
}
