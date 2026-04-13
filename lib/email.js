// Resend wrapper. Falls back to console logging if no API key (dev fallback).

import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM || "FluxBid <onboarding@resend.dev>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

let client = null;
function getClient() {
  if (client) return client;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  client = new Resend(key);
  return client;
}

async function send({ to, subject, html }) {
  const c = getClient();
  if (!c) {
    console.warn("[email] RESEND_API_KEY missing — would have sent:", { to, subject });
    return { skipped: true };
  }
  try {
    const { data, error } = await c.emails.send({ from: FROM, to, subject, html });
    if (error) {
      console.error("[email] send failed:", error);
      return { error };
    }
    return { data };
  } catch (err) {
    console.error("[email] exception:", err);
    return { error: err };
  }
}

function baseTemplate(title, bodyHtml) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#05060a;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#e5e7eb">
    <div style="max-width:560px;margin:0 auto;padding:40px 24px">
      <div style="font-size:28px;font-weight:900;letter-spacing:-0.02em;margin-bottom:32px">
        <span style="background:linear-gradient(135deg,#fde68a,#fbbf24,#f59e0b);-webkit-background-clip:text;background-clip:text;color:transparent">Flux</span><span style="color:#fff">Bid</span>
      </div>
      <div style="background:linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px">
        <h1 style="color:#fff;font-size:22px;font-weight:700;margin:0 0 12px">${title}</h1>
        ${bodyHtml}
      </div>
      <p style="color:#64748b;font-size:12px;text-align:center;margin-top:32px">
        &copy; ${new Date().getFullYear()} FluxBid · The premium marketplace
      </p>
    </div>
  </body>
</html>`;
}

export async function sendVerificationEmail(to, token, name) {
  const link = `${APP_URL}/api/auth/verify?token=${encodeURIComponent(token)}&email=${encodeURIComponent(to)}`;
  const body = `
    <p style="color:#cbd5e1;line-height:1.6;margin:0 0 20px">Hi ${escapeHtml(name || "")}, welcome to FluxBid.</p>
    <p style="color:#cbd5e1;line-height:1.6;margin:0 0 24px">Click the button below to verify your email address. The link expires in 24 hours.</p>
    <a href="${link}" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#000;text-decoration:none;border-radius:12px;font-weight:700;font-size:14px">Verify Email</a>
    <p style="color:#64748b;font-size:12px;margin-top:24px;line-height:1.6">Or paste this URL into your browser:<br/><a href="${link}" style="color:#fbbf24;word-break:break-all">${link}</a></p>
  `;
  return send({
    to,
    subject: "Verify your FluxBid account",
    html: baseTemplate("Verify your email", body)
  });
}

export async function sendOrderConfirmationEmail(to, order) {
  const rows = (order.items || [])
    .map(
      (item) => `<tr>
        <td style="padding:12px 0;color:#e5e7eb;font-size:14px">${escapeHtml(item.name)} <span style="color:#64748b">× ${item.quantity}</span></td>
        <td style="padding:12px 0;color:#fbbf24;font-size:14px;text-align:right;font-weight:600">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  const body = `
    <p style="color:#cbd5e1;line-height:1.6;margin:0 0 20px">Thanks for your order — we've got it.</p>
    <p style="color:#64748b;font-size:13px;margin:0 0 20px">Order ID: <span style="color:#fbbf24;font-family:monospace">${order.id}</span></p>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid rgba(255,255,255,0.08);border-bottom:1px solid rgba(255,255,255,0.08);margin:16px 0">
      ${rows}
    </table>
    <div style="display:flex;justify-content:space-between;padding-top:12px">
      <span style="color:#e5e7eb;font-size:16px;font-weight:700">Total</span>
      <span style="color:#fbbf24;font-size:20px;font-weight:800">$${Number(order.total || 0).toFixed(2)}</span>
    </div>
    ${order.payment?.last4 ? `<p style="color:#64748b;font-size:12px;margin-top:20px">Charged to ${escapeHtml(order.payment.brand || "card").toUpperCase()} ···· ${escapeHtml(order.payment.last4)}</p>` : ""}
  `;
  return send({
    to,
    subject: `Order confirmed · $${Number(order.total || 0).toFixed(2)}`,
    html: baseTemplate("Order confirmed", body)
  });
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
