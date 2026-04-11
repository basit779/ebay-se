"use client";

import { useState } from "react";

const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' fill='%230d1020'%3E%3Crect width='800' height='800'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='40' fill='%23ffffff15'%3ENo Image%3C/text%3E%3C/svg%3E";

export default function ProductImage({ src, alt, className = "", ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError ? FALLBACK : imgSrc}
      alt={alt || "Product"}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(FALLBACK);
        }
      }}
      loading="lazy"
      {...props}
    />
  );
}
