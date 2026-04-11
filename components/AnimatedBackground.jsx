"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedBackground() {
  const containerRef = useRef(null);
  const blobRefs = useRef([]);

  useEffect(() => {
    const blobs = blobRefs.current.filter(Boolean);
    if (blobs.length === 0) return;

    const timelines = blobs.map((blob, i) => {
      const duration = 6 + i * 2;
      const xRange = 30 + i * 15;
      const yRange = 25 + i * 10;

      return gsap.to(blob, {
        y: `random(-${yRange}, ${yRange})`,
        x: `random(-${xRange}, ${xRange})`,
        scale: `random(0.8, 1.2)`,
        repeat: -1,
        yoyo: true,
        duration,
        ease: "sine.inOut",
        delay: i * 0.5
      });
    });

    return () => timelines.forEach((tl) => tl.kill());
  }, []);

  const blobs = [
    { color: "bg-neon-purple/20", size: "h-[400px] w-[400px]", pos: "-left-20 -top-20", blur: "blur-[100px]" },
    { color: "bg-neon-cyan/15", size: "h-[500px] w-[500px]", pos: "-right-20 top-1/4", blur: "blur-[120px]" },
    { color: "bg-neon-blue/15", size: "h-[450px] w-[450px]", pos: "bottom-[-120px] left-1/3", blur: "blur-[110px]" },
    { color: "bg-neon-purple/10", size: "h-[300px] w-[300px]", pos: "right-1/4 top-10", blur: "blur-[80px]" },
    { color: "bg-neon-cyan/8", size: "h-[350px] w-[350px]", pos: "left-1/4 bottom-20", blur: "blur-[90px]" }
  ];

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((blob, i) => (
        <div
          key={i}
          ref={(el) => (blobRefs.current[i] = el)}
          className={`absolute rounded-full ${blob.color} ${blob.size} ${blob.pos} ${blob.blur}`}
        />
      ))}
      <div className="particles" />
      <div className="aurora-bg" />
    </div>
  );
}
