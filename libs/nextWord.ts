import {LessonState} from '../stores/UIStore';

export default function nextWord(uiStore, wordsStore) {
  if (uiStore.wordIndex < wordsStore.lessonWords.length - 1) {
    uiStore.setWordIndex(uiStore.wordIndex + 1);
    uiStore.setLessonState(LessonState.IsSpeaking);
  } else {
    uiStore.setLessonState(LessonState.IsFinished);
  }
}
