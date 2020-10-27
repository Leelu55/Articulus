export function getRandomInt(range: number): number {
  return Math.floor(Math.random() * Math.floor(range));
}

export function getWeekDayString(weekDay: number): string {
  return [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
  ][weekDay];
}
// https://stackoverflow.com/a/3224854
export function getDiffDays(date1: Date, date2: Date) {
  const diffTime = Math.abs(date2.getDate() - date1.getDate());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
