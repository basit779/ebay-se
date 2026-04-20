export default function ProductLoading() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery placeholder */}
          <div className="space-y-4">
            <div className="skeleton aspect-square w-full !rounded-3xl bg-zinc-200/5" />
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton aspect-square !rounded-xl bg-zinc-200/5" />
              ))}
            </div>
          </div>

          {/* Details placeholder */}
          <div className="space-y-6">
            <div className="skeleton h-3 w-24" />
            <div className="space-y-3">
              <div className="skeleton h-10 w-4/5" />
              <div className="skeleton h-10 w-2/3" />
            </div>
            <div className="skeleton h-4 w-40" />
            <div className="skeleton h-12 w-32" />

            <div className="space-y-2 pt-6">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
              <div className="skeleton h-4 w-4/5" />
            </div>

            <div className="flex gap-4 pt-6">
              <div className="skeleton h-12 flex-1 !rounded-full" />
              <div className="skeleton h-12 w-32 !rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
