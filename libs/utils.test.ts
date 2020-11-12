import {WordType} from '../stores/WordsStore';
import {calcLearningProgressPercentage} from './utils';

function createNewWordInSlot(slotNumber) {
  const newWord: WordType = {
    value: 'Test',
    slot: slotNumber,
    article: 'der',
    timestamp: new Date(Date.now()),
    dueDateTime: new Date(Date.now()),
    imageUrl: 'test.jpg',
  };
  return newWord;
}

function testCalclearningProgressPercentage(slotsArray) {
  let newWordArray: WordType[] = [];

  slotsArray.forEach((wordsCount, slotNumber) => {
    for (let i = 0; i < wordsCount; i++) {
      newWordArray.push(createNewWordInSlot(slotNumber));
    }
  });
  return calcLearningProgressPercentage(newWordArray);
}

it('test calcLearningProgressPercentage', () => {
  expect(
    testCalclearningProgressPercentage([100, 200, 200, 200, 200, 200]),
  ).toBe(55);

  expect(testCalclearningProgressPercentage([200, 230, 120, 230, 5, 0])).toBe(
    30,
  );

  expect(testCalclearningProgressPercentage([990, 2, 2, 2, 2, 2])).toBe(1);

  expect(testCalclearningProgressPercentage([50, 109, 345, 0, 123, 500])).toBe(
    67,
  );
  expect(testCalclearningProgressPercentage([234, 34, 55, 324, 75, 23])).toBe(
    41,
  );

  expect(testCalclearningProgressPercentage([1000, 0, 0, 0, 0, 0])).toBe(0);

  expect(testCalclearningProgressPercentage([0, 0, 0, 0, 0, 1000])).toBe(100);

  expect(testCalclearningProgressPercentage([0, 1000, 0, 0, 0, 0])).toBe(20);
});
