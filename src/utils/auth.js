const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email) {
  return EMAIL_RE.test(email);
}

function toHex(bytes) {
  return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}

export function randomSalt() {
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  return toHex(bytes);
}

// Accounts are only kept in the browser for now, so we never store the raw password.
export async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(salt + ":" + password);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return toHex(new Uint8Array(digest));
}
