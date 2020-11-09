import {LessonState} from '../stores/UIStore';

export default function startLesson(wordsStore, uiStore, navigation) {
  wordsStore.emptyLesson();
  wordsStore.removeEmptySavedLessons();
  if (wordsStore.populateLesson()) {
    uiStore.setLessonState(LessonState.IsSpeaking);
    uiStore.setWordIndex(0);
    navigation.navigate('PlayerScreen');
  } else {
    navigation.navigate('EmptyWordsScreen');
  }
}
