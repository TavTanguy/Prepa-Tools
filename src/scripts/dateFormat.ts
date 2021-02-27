export function convertToDate(str: string) {
  const [dateStr, time] = str.split(" ");
  const [year, month, day] = dateStr.split("-").map((el) => parseInt(el, 10));
  const [hour, min, sec] = time.split(":").map((el) => parseInt(el, 10));
  const date = new Date();
  date.setUTCFullYear(year, month - 1, day);
  date.setUTCHours(hour, min, sec, 0);
  return date;
}
export function fillZ(number: number) {
  return ("0" + number).slice(-2);
}
export function formatGetDate(date: Date) {
  return `${fillZ(date.getUTCDate())}/${fillZ(
    date.getUTCMonth() + 1
  )}/${date.getUTCFullYear()}`;
}
export function formatDay(date: Date) {
  return `${fillZ(date.getUTCHours())}h${fillZ(date.getUTCMinutes())}`;
}
export function formatDate(date: Date) {
  return `${formatGetDate(date)} - ${formatDay(date)}`;
}
