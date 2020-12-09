import {LessonState} from '../stores/UIStore';

export default function startLesson(wordsStore, uiStore, navigation) {
  uiStore.setGrammarHintShown(false);

  if (wordsStore.lessonWords.length !== 0) {
    uiStore.setLessonState(LessonState.IsSpeaking);
    uiStore.setWordIndex(0);
    navigation.navigate('PlayerScreen');
  } else {
    navigation.navigate('EmptyWordsScreen');
  }
}
