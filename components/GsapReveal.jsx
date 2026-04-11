"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GsapReveal({ children, y = 36 }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;
    gsap.fromTo(
      rootRef.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [y]);

  return <div ref={rootRef}>{children}</div>;
}
