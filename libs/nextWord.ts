import {LessonState} from '../stores/UIStore';

export default function nextWord(uiStore, wordsStore) {
  if (uiStore.wordIndex < wordsStore.lessonWords.length - 1) {
    uiStore.setWordIndex(uiStore.wordIndex + 1);
    uiStore.setLessonState(LessonState.IsSpeaking);
  } else {
    const currentSavedLessonRef = wordsStore.savedLessons.slice(-1)[0];
    currentSavedLessonRef.isFinished = true;
    uiStore.setLessonState(LessonState.IsFinished);
  }
}
