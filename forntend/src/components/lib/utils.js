export function formatDate(date) {
  if (!(date instanceof Date) || isNaN(date)) return;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
