import {LessonWordType, WordType} from '../stores/WordsStore';
import settings from './settings.json';
import {getRandomInt} from '../libs/utils';

export function sortWordsByDueDateTime(
  wordA: WordType,
  wordB: WordType,
): number {
  const aIsEarlierThanB = -1;
  const bIsEarlierThanA = 1;

  if (wordA.dueDateTime === wordB.dueDateTime) {
    return 0;
  }

  if (wordA.dueDateTime === null) {
    return aIsEarlierThanB;
  }

  if (wordB.dueDateTime === null) {
    return bIsEarlierThanA;
  }

  if (wordA.dueDateTime < wordB.dueDateTime) {
    return aIsEarlierThanB;
  }

  return bIsEarlierThanA;
}

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

//extract the needed words per slot using the "calulatedRatio" and timestamp and store them in an array
export default function populateLesson(words: WordType[]): LessonWordType[] {
  const lessonWords = [];
  const now = Date.now();
  let _lessonWords: WordType[] = words
    .filter((word) => {
      if (word.dueDateTime === null) {
        return false;
      }
      console.log(word.dueDateTime);
      return new Date(word.dueDateTime).getTime() <= now;
    })
    .sort(sortWordsByDueDateTime)
    .slice(0, settings.lessonSize);
  _lessonWords = _lessonWords.concat(
    getRandomNewWords(settings.lessonSize - _lessonWords.length, words),
  );
  for (const word of _lessonWords) {
    lessonWords.push({
      value: word.value,
      article: word.article,
      answerArticle: null,
      imageUrl: word.imageUrl,
    });
  }
  return lessonWords;
}
