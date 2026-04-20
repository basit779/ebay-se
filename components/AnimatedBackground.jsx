"use client";

/**
 * Lean premium background — 2 GPU-composited blobs + vignette.
 * Dropped: the 8 box-shadow-blurred particle dots, the grid overlay,
 * and the 3rd/4th blob. All expensive on pages that don't need them.
 */
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-[#0a0807] to-obsidian" />

      {/* Two slow blobs — enough to suggest depth, cheap to render */}
      <div
        className="absolute left-[-10%] top-[8%] h-[520px] w-[520px] rounded-full bg-champagne-400/[0.08]"
        style={{
          filter: "blur(100px)",
          animation: "blob-1 24s ease-in-out infinite",
          willChange: "transform"
        }}
      />
      <div
        className="absolute right-[-12%] bottom-[8%] h-[560px] w-[560px] rounded-full bg-champagne-600/[0.08]"
        style={{
          filter: "blur(110px)",
          animation: "blob-2 28s ease-in-out infinite",
          willChange: "transform"
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/60" />
    </div>
  );
}
