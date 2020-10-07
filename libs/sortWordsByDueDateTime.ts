import {WordType} from '../stores/WordsStore';

// sorting words from past to present
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
