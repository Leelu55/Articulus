import ttsLibrary from 'react-native-tts';
import voiceLibrary from '@react-native-community/voice';

import extractArticle from './extractArticle';
import {LessonState} from '../stores/UIStore';
import processAnswer from './processAnswer';

class AudioVoice {
  setup(uiStore, wordsStore) {
    ttsLibrary.addEventListener('tts-finish', () => {
      this.startUserInteraction(uiStore);
    });

    voiceLibrary.onSpeechStart = () => {
      uiStore.setLessonState(LessonState.IsListening);
    };

    voiceLibrary.onSpeechResults = (event) => {
      const currentArticle = extractArticle(event.value);

      if (currentArticle === null) {
        uiStore.setLessonState(LessonState.IsRepeating);
        return;
      }
      processAnswer(wordsStore, uiStore, currentArticle);
    };

    voiceLibrary.onSpeechError = () => {
      if (uiStore.lessonState !== LessonState.IsSpeaking) {
        uiStore.setLessonState(LessonState.IsRepeating);
      }
    };
  }

  private startUserInteraction(uiStore: any) {
    if (uiStore.autoMode) {
      this.voiceStart();
    } else {
      uiStore.setLessonState(LessonState.IsWaitingForUserAction);
    }
  }

  cleanup() {
    ttsLibrary.stop(0);
    ttsLibrary.removeEventListener('tts-finish', this.voiceStart);
    voiceLibrary.destroy();
  }

  voiceStart() {
    //console.error(1);
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
