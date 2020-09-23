import {LessonState} from '../stores/UIStore';

export default function processAnswer(
  wordsStore: any,
  uiStore: any,
  currentArticle,
) {
  const wordIndex = uiStore.wordIndex;
  const lessonWordsLength = wordsStore.lessonWords.length;

  const clw = wordsStore.lessonWords[wordIndex];

  wordsStore.setAnswerArticleForLessonWord(clw.value, currentArticle);
  //checkAnswer && checkArticle
  if (currentArticle === clw.article) {
    wordsStore.incrementSlotForWord(clw.value);
  } else {
    wordsStore.decrementSlotForWord(clw.value);
  }

  wordsStore.updateTimeStampForWord(clw.value);
  wordsStore.updateDueDateTimeForWord(clw.value);
  uiStore.setLessonState(LessonState.IsEvaluating);
  setTimeout(() => {
    if (uiStore.lessonState === LessonState.IsEvaluating) {
      if (wordIndex < lessonWordsLength - 1) {
        uiStore.setWordIndex(wordIndex + 1);
        uiStore.setLessonState(LessonState.IsSpeaking);
      } else {
        uiStore.setLessonState(LessonState.IsFinished);
      }
    }
  }, 2000);
}
