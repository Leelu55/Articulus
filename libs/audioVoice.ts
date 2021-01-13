import ttsLibrary from 'react-native-tts';
import voiceLibrary from '@react-native-community/voice';

import extractArticle from './extractArticle';
import {LessonState} from '../stores/UIStore';
import processAnswer from './processAnswer';

// callbacks for ttsLibrary events to be modified on setup and cleanup
let onTtsStart = null;
let onTtsFinish = null;
let onTtsCancel = null;
let onTtsError = null;

export function setup(uiStore, wordsStore) {
  onTtsFinish = () => {
    function startUserInteraction() {
      if (uiStore.autoMode) {
        voiceStart();
      } else {
        uiStore.setLessonState(LessonState.IsWaitingForUserAction);
      }
    }

    startUserInteraction();
  };

  onTtsStart = () => {};

  onTtsCancel = () => {};

  onTtsError = () => {};

  ttsLibrary.addEventListener('tts-finish', onTtsFinish);
  ttsLibrary.addEventListener('tts-cancel', onTtsCancel);
  ttsLibrary.addEventListener('tts-start', onTtsStart);
  ttsLibrary.addEventListener('tts-error', onTtsError);

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

export function cleanup() {
  ttsLibrary.stop();
  ttsLibrary.removeEventListener('tts-finish', onTtsFinish);
  ttsLibrary.removeEventListener('tts-start', onTtsStart);
  ttsLibrary.removeEventListener('tts-error', onTtsError);
  ttsLibrary.removeEventListener('tts-cancel', onTtsCancel);
  voiceLibrary.destroy();
}

export function voiceStart() {
  voiceLibrary.start('de-DE');
}

export function voiceStop() {
  voiceLibrary.destroy();
}

export function stopSpeakWord() {
  ttsLibrary.stop();
}
// solving E/AndroidRuntime: FATAL EXCEPTION: TTS.AudioPlaybackThread
// https://github.com/ak1394/react-native-tts/issues/121
export function speakWord(wordValue) {
  ttsLibrary.speak(wordValue, {
    androidParams: {KEY_PARAM_STREAM: 'STREAM_MUSIC'},
  });
}

export function repeatWord(prefixText, wordValue) {
  ttsLibrary.speak(prefixText + '\n' + wordValue);
}
