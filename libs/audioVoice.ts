import ttsLibrary from 'react-native-tts';
import voiceLibrary from '@react-native-community/voice';

import extractArticle from './extractArticle';
import {LessonState} from '../stores/UIStore';

class AudioVoice {
  setup(uiStore, wordsStore) {
    ttsLibrary.addEventListener('tts-finish', this.voiceStart);
    voiceLibrary.onSpeechStart = () => {
      uiStore.setLessonState(LessonState.IsListening);
    };

    voiceLibrary.onSpeechResults = (event) => {
      const wordIndex = uiStore.wordIndex;

      const clw = wordsStore.lessonWords[wordIndex];
      uiStore.setLessonState(LessonState.IsEvaluating);

      const currentArticle = extractArticle(event.value);
      //checkAnswer && checkArticle
      if (currentArticle === clw.article) {
        wordsStore.setAnswerArticleForLessonWord(clw.value, currentArticle);
        console.log(clw);

        wordsStore.incrementSlotForWord(clw.value);
      }
      wordsStore.updateTimeStampForWord(clw.value);

      if (wordIndex < wordsStore.lessonWords.length - 1) {
        uiStore.setWordIndex(wordIndex + 1);
      } else {
        uiStore.setLessonState(LessonState.IsFinished);
      }
    };

    voiceLibrary.onSpeechError = () => {
      const wordIndex = uiStore.wordIndex;

      const cw = wordsStore.lessonWords[wordIndex];
      uiStore.setLessonState(LessonState.IsSpeaking);
      this.repeatWord('Bitte wiederhole den Artikel für', cw.value);
    };
  }

  cleanup() {
    ttsLibrary.stop(0);
    ttsLibrary.removeEventListener('tts-finish', this.voiceStart);
    voiceLibrary.destroy();
  }

  voiceStart() {
    voiceLibrary.start('de-DE');
  }

  speakWord(wordValue) {
    ttsLibrary.speak(wordValue);
  }

  repeatWord(prefixText, wordValue) {
    ttsLibrary.speak(prefixText + ',,' + wordValue);
  }
}

export default new AudioVoice();
