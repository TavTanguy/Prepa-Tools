export function convertToDate(str: string) {
  const [dateStr, time] = str.split(" ");
  const [year, month, day] = dateStr.split("-").map((el) => parseInt(el, 10));
  const [hour, min, sec] = time.split(":").map((el) => parseInt(el, 10));
  const date = new Date();
  date.setFullYear(year, month - 1, day);
  date.setHours(hour, min, sec, 0);
  return date;
}
export function fillZ(number: number) {
  return ("0" + number).slice(-2);
}
export function formatGetDate(date: Date) {
  return `${fillZ(date.getDate())}/${fillZ(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;
}
export function formatDay(date: Date) {
  return `${fillZ(date.getHours())}h${fillZ(date.getMinutes())}`;
}
export function formatDate(date: Date) {
  return `${formatGetDate(date)} - ${formatDay(date)}`;
}
