import {WordType} from '../stores/WordsStore';
import populateLesson, {getRandomNewWords} from './populateLesson';
import {sortWordsByDueDateTime} from './sortWordsByDueDateTime';
import testmodel from '../model/testmodel.json';
import settings from './settings.json';

function getSequentialNewWords(numberOfNewWords: number, words: WordType[]) {
  const sequentialNewWords = words
    .filter((word) => word.slot === 0 && word.dueDateTime === null)
    .slice(0, numberOfNewWords);

  return sequentialNewWords;
}

it('test getRandomNewWords', () => {
  let newWordArray: WordType[] = [];
  testmodel.words.forEach((word) => {
    const newWord: WordType = {
      value: word.value,
      slot: word.slot,
      article: word.article,
      timestamp: word.timestamp,
      dueDateTime: word.dueDateTime,
      imageUrl: word.imageUrl,
      ruleId: word.ruleId,
    };
    newWordArray.push(newWord);
  });
  expect(getRandomNewWords(5, newWordArray)).toHaveLength(5);
});

it('test sortWordsByDueDateTime', () => {
  let newWordArray: WordType[] = [];
  testmodel.words.forEach((word) => {
    const newWord: WordType = {
      value: word.value,
      slot: word.slot,
      article: word.article,
      timestamp: new Date(word.timestamp),
      dueDateTime: new Date(
        Date.now() + Math.pow(2, word.slot) * 1000 * 60 * 60 * 24,
      ),
      imageUrl: word.imageUrl,
      ruleId: word.ruleId,
    };
    newWordArray.push(newWord);
  });

  expect(
    newWordArray.sort(sortWordsByDueDateTime).map((word) => word.value),
  ).toStrictEqual([
    'Gartenzwerg',
    'Schornsteinfeger',
    'Haus',
    'Baum',
    'Hund',
    'Katze',
    'Tasse',
    'Sonne',
    'Mensch',
    'Wasser',
    'Tisch',
    'Eule',
    'Sonnenbrille',
    'Computer',
    'Handtasche',
    'Taschentuch',
    'Weihnachtsmann',
    'Zahn',
    'Kopf',
    'Fuß',
    'Hand',
    'Auge',
    'Mund',
    'Nase',
    'Ohr',
    'Handy',
  ]);
});

it('populateLesson with initial words, first time app start ', () => {
  const now = Date.now();
  expect(
    populateLesson(testmodel.words, now, getSequentialNewWords).map(
      (word) => word.value,
    ),
  ).toStrictEqual(
    [
      'Gartenzwerg',
      'Schornsteinfeger',
      'Haus',
      'Baum',
      'Hund',
      'Katze',
      'Tasse',
      'Sonne',
      'Mensch',
      'Wasser',
      'Tisch',
      'Eule',
      'Sonnenbrille',
      'Computer',
      'Handtasche',
      'Taschentuch',
      'Weihnachtsmann',
      'Zahn',
      'Kopf',
      'Fuß',
      'Hand',
      'Auge',
      'Mund',
      'Nase',
      'Ohr',
      'Handy',
    ].slice(0, settings.lessonSize),
  );
});

function setDueDateTime(dateString: string) {
  return {
    dueDateTime: new Date(dateString).getTime(),
  };
}

function setSlot(slot: number) {
  return {slot};
}

function modifyWord(words: WordType[], value: string, change: any) {
  const wordIndex: number = words.findIndex((word) => word.value === value);
  const changeAttribute = Object.keys(change)[0];
  words[wordIndex][changeAttribute] = change[changeAttribute];
}

it('populateLesson with modified words 1', () => {
  const modifiedWords = testmodel.words.slice();

  const now = new Date('2021-01-05');
  modifyWord(modifiedWords, 'Gartenzwerg', setDueDateTime('2020-01-04'));
  modifyWord(modifiedWords, 'Gartenzwerg', setSlot(1));
  modifyWord(modifiedWords, 'Haus', setDueDateTime('2020-01-08'));

  expect(
    populateLesson(modifiedWords, now.getTime(), getSequentialNewWords).map(
      (word) => word.value,
    ),
  ).toStrictEqual(
    [
      'Gartenzwerg',
      'Haus',
      'Schornsteinfeger',
      'Baum',
      'Hund',
      'Katze',
      'Tasse',
      'Sonne',
      'Mensch',
      'Wasser',
      'Tisch',
      'Eule',
      'Sonnenbrille',
      'Computer',
      'Handtasche',
      'Taschentuch',
      'Weihnachtsmann',
      'Zahn',
      'Kopf',
      'Fuß',
      'Hand',
      'Auge',
      'Mund',
      'Nase',
      'Ohr',
      'Handy',
    ].slice(0, settings.lessonSize),
  );
});
