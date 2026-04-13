"use client";

import { useEffect, useRef } from "react";

export default function HeroParticles({ density = 70 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles = [];
    let rafId;
    let mouseX = -9999;
    let mouseY = -9999;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(density, Math.floor((width * height) / 14000));
      particles = Array.from({ length: count }, () => spawn());
    };

    const spawn = () => {
      const palette = [
        "rgba(251,191,36,",
        "rgba(34,211,238,",
        "rgba(255,255,255,"
      ];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.25 - 0.05,
        life: Math.random(),
        color: palette[Math.floor(Math.random() * palette.length)],
        a: Math.random() * 0.5 + 0.15
      };
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        // gentle cursor attraction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 22500) {
          const f = (1 - d2 / 22500) * 0.04;
          p.vx += dx * f * 0.002;
          p.vy += dy * f * 0.002;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.995;
        p.life += 0.003;

        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          Object.assign(p, spawn(), { y: height + 10, x: Math.random() * width });
        }

        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.life * 2));
        ctx.beginPath();
        ctx.fillStyle = p.color + alpha + ")";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        // soft halo
        ctx.beginPath();
        ctx.fillStyle = p.color + alpha * 0.15 + ")";
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(step);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    resize();
    if (!reduce) rafId = requestAnimationFrame(step);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
