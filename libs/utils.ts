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
