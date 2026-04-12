"use client";

// Performance-optimized: Pure CSS animations only (no JS mousemove listeners)
// Uses transform + opacity (GPU-accelerated), no expensive filters or conic gradients

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#05060a] to-black" />

      {/* Static gradient blobs — no JS, pure CSS keyframes */}
      <div
        className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.12]"
        style={{
          filter: "blur(80px)",
          animation: "blob-1 20s ease-in-out infinite",
          willChange: "transform"
        }}
      />
      <div
        className="absolute right-[-10%] top-[30%] h-[550px] w-[550px] rounded-full bg-purple-500/[0.12]"
        style={{
          filter: "blur(80px)",
          animation: "blob-2 22s ease-in-out infinite",
          willChange: "transform"
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[30%] h-[450px] w-[450px] rounded-full bg-blue-500/[0.1]"
        style={{
          filter: "blur(80px)",
          animation: "blob-3 25s ease-in-out infinite",
          willChange: "transform"
        }}
      />

      {/* Grid overlay — static, no animation */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at center, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 70%)"
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
    </div>
  );
}
