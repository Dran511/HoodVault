export function formatPeso(amount) {
  return "₱ " + Number(amount || 0).toLocaleString("en-US");
}

export function formatOrderDate(date = new Date()) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Birthdays are stored as YYYY-MM-DD (from the date input) and shown as "April 21, 1998".
export function formatBirthday(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return value;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}
