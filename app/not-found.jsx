import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative">
        <h1 className="text-[120px] font-black leading-none text-white/[0.03] md:text-[200px]">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-purple">
              Not Found
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Page doesn&apos;t exist</h2>
          </div>
        </div>
      </div>
      <p className="mt-4 max-w-md text-sm text-white/40">
        The page you&apos;re looking for may have been moved or doesn&apos;t exist.
        Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-xl border border-white/[0.08] px-6 py-3 text-sm font-medium text-white/60 transition hover:text-white"
        >
          Go Home
        </Link>
        <Link
          href="/shop"
          className="rounded-xl bg-neon-cyan/10 px-6 py-3 text-sm font-medium text-neon-cyan transition hover:bg-neon-cyan/20"
        >
          Browse Shop
        </Link>
      </div>
    </section>
  );
}
