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
      const lessonWordsLength = wordsStore.lessonWords.length;

      const clw = wordsStore.lessonWords[wordIndex];

      const currentArticle = extractArticle(event.value);
      //checkAnswer && checkArticle
      if (currentArticle === clw.article) {
        wordsStore.setAnswerArticleForLessonWord(clw.value, currentArticle);
        wordsStore.incrementSlotForWord(clw.value);
      }
      wordsStore.updateTimeStampForWord(clw.value);
      uiStore.setLessonState(LessonState.IsEvaluating);
      setTimeout(() => {
        if (wordIndex < lessonWordsLength - 1) {
          uiStore.setWordIndex(wordIndex + 1);
          uiStore.setLessonState(LessonState.IsSpeaking);
        } else {
          uiStore.setLessonState(LessonState.IsFinished);
        }
      }, 1000);
    };

    voiceLibrary.onSpeechError = () => {
      if (uiStore.LessonState !== LessonState.IsSpeaking) {
        uiStore.setLessonState(LessonState.IsRepeating);
      }
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

  voiceStop() {
    voiceLibrary.destroy();
  }

  stopSpeakWord() {
    ttsLibrary.stop();
  }

  speakWord(wordValue) {
    ttsLibrary.speak(wordValue);
  }

  repeatWord(prefixText, wordValue) {
    ttsLibrary.speak(prefixText + ',,' + wordValue);
  }
}

export default new AudioVoice();
