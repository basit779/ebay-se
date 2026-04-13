"use client";

// Goldy-modern: amber + champagne + soft purple accent. GPU-only.

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0807] to-black" />

      {/* Goldy blobs */}
      <div
        className="absolute left-[-10%] top-[8%] h-[560px] w-[560px] rounded-full bg-amber-400/[0.18]"
        style={{
          filter: "blur(90px)",
          animation: "blob-1 22s ease-in-out infinite",
          willChange: "transform"
        }}
      />
      <div
        className="absolute right-[-12%] top-[24%] h-[600px] w-[600px] rounded-full bg-orange-500/[0.14]"
        style={{
          filter: "blur(100px)",
          animation: "blob-2 24s ease-in-out infinite",
          willChange: "transform"
        }}
      />
      <div
        className="absolute bottom-[-14%] left-[28%] h-[520px] w-[520px] rounded-full bg-yellow-300/[0.10]"
        style={{
          filter: "blur(90px)",
          animation: "blob-3 26s ease-in-out infinite",
          willChange: "transform"
        }}
      />
      {/* Subtle purple counter-accent for depth */}
      <div
        className="absolute right-[15%] bottom-[10%] h-[380px] w-[380px] rounded-full bg-purple-600/[0.10]"
        style={{
          filter: "blur(80px)",
          animation: "blob-1 28s ease-in-out infinite",
          willChange: "transform"
        }}
      />

      {/* Subtle gold grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,191,36,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(circle at center, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 70%)"
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
    </div>
  );
}
