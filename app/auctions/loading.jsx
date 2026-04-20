import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";

export default function AuctionsLoading() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 space-y-5">
          <div className="skeleton h-3 w-28" />
          <div className="skeleton h-12 w-80 md:h-16 md:w-[28rem]" />
          <div className="skeleton h-4 w-full max-w-md" />
        </div>
        <ProductGridSkeleton count={6} columns={3} />
      </div>
    </section>
  );
}
