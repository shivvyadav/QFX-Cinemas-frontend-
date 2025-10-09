export function YearExtract(date) {
  if (typeof date !== "string" || !date.includes("-")) {
    return null;
  }
  return date.split("-")[0];
}
