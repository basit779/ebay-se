"use client";

import { useState } from "react";
import Image from "next/image";

const FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' fill='%230d1020'%3E%3Crect width='800' height='800'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='40' fill='%23ffffff15'%3ENo Image%3C/text%3E%3C/svg%3E";

/**
 * next/image wrapper. Wraps itself in a relative full-size container so
 * callers can keep passing `className="h-full w-full ..."` without knowing
 * about next/image's fill requirements. Incoming className still applies
 * to the <Image> element so hover transforms / filters keep working.
 *
 * Pass priority for the hero image; everything else lazy-loads.
 */
export default function ProductImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1280px) 320px, (min-width: 768px) 50vw, 100vw",
  style,
  ...rest
}) {
  const [hasError, setHasError] = useState(false);
  const resolved = hasError || !src ? FALLBACK : src;
  const isData = resolved.startsWith("data:");

  return (
    <div className="relative h-full w-full">
      <Image
        src={resolved}
        alt={alt || "Product"}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        className={`object-cover ${className}`}
        style={style}
        onError={() => setHasError(true)}
        unoptimized={isData}
        {...rest}
      />
    </div>
  );
}
