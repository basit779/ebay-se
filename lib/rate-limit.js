// Tiny in-memory sliding-window rate limiter.
// Works per server instance — OK for single-process Next dev + Vercel serverless
// burst windows. For real distributed RL, swap with Upstash or similar.

const buckets = new Map();

function prune(bucket, since) {
  while (bucket.length && bucket[0] < since) bucket.shift();
}

/**
 * @param key string — e.g. `register:<ip>` or `verify:<email>`
 * @param limit number — max requests in window
 * @param windowMs number — window size in ms
 * @returns { ok: boolean, remaining: number, retryAfterMs: number }
 */
export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const since = now - windowMs;
  const bucket = buckets.get(key) || [];
  prune(bucket, since);
  if (bucket.length >= limit) {
    const retryAfterMs = bucket[0] + windowMs - now;
    return { ok: false, remaining: 0, retryAfterMs: Math.max(retryAfterMs, 0) };
  }
  bucket.push(now);
  buckets.set(key, bucket);
  return { ok: true, remaining: limit - bucket.length, retryAfterMs: 0 };
}

export function clientIp(req) {
  // Next.js route handlers don't expose IP directly. Fall back to header chain.
  const fwd = req.headers.get("x-forwarded-for") || "";
  const ip = fwd.split(",")[0].trim();
  return ip || req.headers.get("x-real-ip") || "unknown";
}
