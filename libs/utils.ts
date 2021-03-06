import myDayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import {WordType} from '../stores/WordsStore';
import settings from './settings.json';

myDayjs.extend(weekOfYear);

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
export function getDiffDays(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays: number = Math.floor((date1 - date2) / oneDay);
  return diffDays;
}

// https://stackoverflow.com/a/33451102
export function arrayRotate<T>(arr: T[], count: number) {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}

export const extDayjs = myDayjs;

export function getLastFourCalenderWeeks() {
  const _calWeeks = [];
  for (let i = 4; i >= 0; i--) {
    const cw = extDayjs().subtract(i, 'week').week();
    _calWeeks.push(cw);
  }
  return _calWeeks;
}

export function calcLearningProgressPercentage(words: WordType[]): number {
  // adding up slots of all words, dividing by wordcount * numberOfSlots
  const reducer = (accumulator: number, word: WordType) =>
    accumulator + word.slot;

  const maxScore = words.length * (settings.numberOfSlots - 1);
  return Math.round((words.reduce(reducer, 0) / maxScore) * 100);
}
