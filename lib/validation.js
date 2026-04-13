// Shared validators for email + payment card data.

// ── Email ──────────────────────────────────────────────────────────
// RFC 5322-lite: one '@', non-empty local + domain parts, domain has a dot, TLD 2+ chars.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email) {
  if (typeof email !== "string") return false;
  const trimmed = email.trim().toLowerCase();
  if (trimmed.length > 254) return false;
  return EMAIL_RE.test(trimmed);
}

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

// ── Card helpers ───────────────────────────────────────────────────
export function normalizeCardNumber(str) {
  return String(str || "").replace(/[\s-]/g, "");
}

// Standard Luhn mod-10 check.
export function luhn(cardNumber) {
  const digits = normalizeCardNumber(cardNumber);
  if (!/^\d{13,19}$/.test(digits)) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

// BIN prefix detection.
export function detectCardBrand(cardNumber) {
  const n = normalizeCardNumber(cardNumber);
  if (!n) return "unknown";
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^(6011|65|64[4-9]|622)/.test(n)) return "discover";
  if (/^3(0[0-5]|[68])/.test(n)) return "diners";
  if (/^(352[89]|35[3-8])/.test(n)) return "jcb";
  return "unknown";
}

// MM/YY — accept 2-digit year, reject months outside 1-12, reject past.
export function isValidExpiry(mmYY) {
  if (typeof mmYY !== "string") return false;
  const match = mmYY.trim().match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!match) return false;
  const month = parseInt(match[1], 10);
  const year = 2000 + parseInt(match[2], 10);
  if (month < 1 || month > 12) return false;
  // Card valid through the last day of the expiry month.
  const expiry = new Date(year, month, 1);
  return expiry.getTime() > Date.now();
}

// CVC: 4 digits for Amex, 3 for everything else.
export function isValidCVC(cvc, brand) {
  if (typeof cvc !== "string") return false;
  const expected = brand === "amex" ? 4 : 3;
  return new RegExp(`^\\d{${expected}}$`).test(cvc);
}

// Last-4 helper for receipt records.
export function last4(cardNumber) {
  const n = normalizeCardNumber(cardNumber);
  return n.slice(-4);
}

// One-shot "is this entire card payload OK?" — used server-side.
export function validateCardPayload({ cardNumber, expiry, cvc } = {}) {
  const brand = detectCardBrand(cardNumber);
  const errors = {};
  if (!luhn(cardNumber)) errors.cardNumber = "Invalid card number";
  if (!isValidExpiry(expiry)) errors.expiry = "Invalid or expired date";
  if (!isValidCVC(cvc, brand)) errors.cvc = brand === "amex" ? "CVC must be 4 digits" : "CVC must be 3 digits";
  return { valid: Object.keys(errors).length === 0, errors, brand, last4: last4(cardNumber) };
}
