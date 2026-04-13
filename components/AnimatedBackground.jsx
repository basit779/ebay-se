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

      {/* Floating gold particles (CSS-only, GPU) */}
      {[
        { left: "12%", top: "18%", size: 4, delay: 0, dur: 7 },
        { left: "82%", top: "22%", size: 3, delay: 1.2, dur: 9 },
        { left: "68%", top: "70%", size: 5, delay: 2.5, dur: 8 },
        { left: "22%", top: "78%", size: 3, delay: 0.8, dur: 10 },
        { left: "48%", top: "12%", size: 2, delay: 3, dur: 11 },
        { left: "92%", top: "55%", size: 4, delay: 1.6, dur: 9 },
        { left: "8%", top: "48%", size: 3, delay: 2, dur: 8 },
        { left: "55%", top: "85%", size: 4, delay: 0.4, dur: 12 }
      ].map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-amber-300"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: 0.5,
            boxShadow: "0 0 12px 2px rgba(251,191,36,0.55)",
            animation: `float-card ${p.dur}s ease-in-out infinite ${p.delay}s`,
            willChange: "transform"
          }}
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
    </div>
  );
}
