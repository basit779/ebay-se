"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/context/ToastContext";

const AUTH_MESSAGES = {
  oauth_failed: "Sign-in with provider failed. Please try again.",
  oauth_unconfigured: "This sign-in provider isn't configured yet.",
  oauth_no_email: "We couldn't get a verified email from that provider.",
  verify_expired: "That verification link has expired — request a new one.",
  verify_invalid: "That verification link is no longer valid.",
  session_expired: "Your session expired. Please sign in again."
};

/**
 * Watches `?auth=<code>` on the current URL. When present, surfaces a
 * toast with a friendly message and strips the param so refreshing
 * doesn't re-fire the toast.
 */
export default function OAuthErrorWatcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addToast } = useToast();

  useEffect(() => {
    const code = searchParams.get("auth");
    if (!code) return;
    const message = AUTH_MESSAGES[code] || "Authentication error. Please try again.";
    addToast(message, code === "verify_expired" || code === "session_expired" ? "info" : "error");

    // Strip the param without reloading
    const next = new URLSearchParams(searchParams.toString());
    next.delete("auth");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [searchParams, pathname, router, addToast]);

  return null;
}
