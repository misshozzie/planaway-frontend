export function formatDate(date) {
  date = new Date(date);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month.toString().length < 2 ? "0" + month : month;
  day = day.toString().length < 2 ? "0" + day : day;
  return `${year}-${month}-${day}`;
}
