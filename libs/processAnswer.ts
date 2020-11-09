import {LessonState} from '../stores/UIStore';

export default function processAnswer(
  wordsStore: any,
  uiStore: any,
  currentArticle,
) {
  const wordIndex = uiStore.wordIndex;
  const lessonWordsLength = wordsStore.lessonWords.length;
  const currentSavedLesson = wordsStore.savedLessons.slice(-1)[0];
  const clw = wordsStore.lessonWords[wordIndex];

  wordsStore.setAnswerArticleForLessonWord(clw.value, currentArticle);
  //checkAnswer && checkArticle
  const index = currentSavedLesson.words.findIndex(
    (word) => word.value === clw.value,
  );
  if (index === -1) {
    throw new Error('word could not be found');
  }
  currentSavedLesson.words[index].answerArticle = currentArticle;

  if (currentArticle === clw.article) {
    wordsStore.incrementSlotForWord(clw.value);
    currentSavedLesson.countCorrectAnswers++;
    currentSavedLesson.words[index].isAnswerCorrect = true;
  } else {
    wordsStore.decrementSlotForWord(clw.value);
    currentSavedLesson.countWrongAnswers++;
    currentSavedLesson.words[index].isAnswerCorrect = false;
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
        currentSavedLesson.isFinished = true;
        uiStore.setLessonState(LessonState.IsFinished);
      }
    }
  }, 1000);
}
