import {LessonWordType, WordType} from '../stores/WordsStore';
import settings from './settings.json';
import {getRandomInt} from '../libs/utils';
import {sortWordsByDueDateTime} from './sortWordsByDueDateTime';
import {Image} from 'react-native';
export function getRandomNewWords(numberOfNewWords: number, words: WordType[]) {
  let randomNewWords: WordType[] = [];
  const newWords = words.filter(
    (word) => word.slot === 0 && word.dueDateTime === null,
  );
  for (let i = 0; i < numberOfNewWords; i++) {
    if (newWords.length) {
      const randomIndex = getRandomInt(newWords.length);
      const randomNewWord = newWords.splice(randomIndex, 1)[0];
      randomNewWords.push(randomNewWord);
    }
  }

  return randomNewWords;
}

// filter the due words from words array, sort by due date and return lesson words array
// all three params are passed over to the function for testability
// @param words source array of words to choose from
// @param now current DateTime
// @param wordPickerFunction top up lesson words array with new words (slot 0) up to lesson size

export default function populateLesson(
  words: WordType[],
  now: number,
  wordPickerFunction: Function = getRandomNewWords,
): LessonWordType[] {
  const lessonWords = [];
  let _lessonWords: WordType[] = words
    .filter((word) => {
      if (word.dueDateTime === null) {
        return false;
      }
      return new Date(word.dueDateTime).getTime() <= now;
    })
    .sort(sortWordsByDueDateTime)
    .slice(0, settings.lessonSize);
  _lessonWords = _lessonWords.concat(
    wordPickerFunction(settings.lessonSize - _lessonWords.length, words),
  );
  for (const word of _lessonWords) {
    Image.prefetch(word.imageUrl);
    Image.prefetch(word.imageUrl + '?w=' + settings.thumbNailSize);
    lessonWords.push({
      value: word.value,
      article: word.article,
      answerArticle: null,
      imageUrl: word.imageUrl,
      ruleId: word.ruleId,
    });
  }
  return lessonWords;
}
