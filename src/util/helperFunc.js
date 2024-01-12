export function formatDate(date) {
  date = new Date(date);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
