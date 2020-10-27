import React, {useContext} from 'react';
import ChartTabsInner from './ChartTabsInner';
import WordsStore from '../stores/WordsStore';
import {getDiffDays} from '../libs/utils';

function ChartTabs() {
  const wordsStore = useContext(WordsStore);
  const savedLessons = wordsStore.savedLessons;

  const today = new Date(Date.now());

  let wordsLearnedInSevenDays = [0, 0, 0, 0, 0, 0, 0];
  let wordsLearnedInWeeksOfMonth = [0, 0, 0, 0, 0];
  let wordsLearnedInOneYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  savedLessons.forEach((lesson) => {
    const lessonDate = new Date(lesson.date);
    const lessonDay = lessonDate.getDay();
    const lessonWeek = Math.round(lessonDate.getDate() / 7) + 1;
    const lessonMonth = lessonDate.getMonth() + 1;
    const diffDaysFromToday = getDiffDays(today, lessonDate);
    if (diffDaysFromToday < 7) {
      wordsLearnedInSevenDays[lessonDay] += lesson.countCorrectAnswers;
    }
    wordsLearnedInWeeksOfMonth[lessonWeek - 1] += lesson.countCorrectAnswers;
    wordsLearnedInOneYear[lessonMonth - 1] += lesson.countCorrectAnswers;
  });

  return (
    <ChartTabsInner
      wordsLearnedInSevenDays={wordsLearnedInSevenDays}
      wordsLearnedInWeeksOfMonth={wordsLearnedInWeeksOfMonth}
      wordsLearnedInOneYear={wordsLearnedInOneYear}
    />
  );
}

export default ChartTabs;
