import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";

export default function Loading() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header placeholder */}
        <div className="mb-16 space-y-5">
          <div className="skeleton h-3 w-32" />
          <div className="skeleton h-12 w-80 md:h-20 md:w-[32rem]" />
          <div className="skeleton h-4 w-full max-w-lg" />
        </div>

        {/* Grid placeholder */}
        <ProductGridSkeleton count={8} />
      </div>
    </section>
  );
}
