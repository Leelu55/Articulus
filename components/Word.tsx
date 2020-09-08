import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import styles from '../styles/wordStyle';
import {WordValue} from './WordValue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {WordImage} from './WordImage';
import WordsStore from '../stores/WordsStore';

import ttsLibrary from 'react-native-tts';
import voiceLibrary from '@react-native-community/voice';
import extractArticle from '../libs/extractArticle';
import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';
import {LessonState} from '../stores/UIStore';

function Word() {
  const uiStore = useContext(UIStore);

  const wordsStore = useContext(WordsStore);

  const currentWord = wordsStore.words[uiStore.wordIndex];

  useEffect(() => {
    uiStore.setLessonState(LessonState.IsSpeaking);
    speakWord(currentWord.value);
  }, [currentWord.value, uiStore]);

  useEffect(() => {
    console.error('useEffect');
    const voiceStart = () => voiceLibrary.start('de-DE');

    ttsLibrary.addEventListener('tts-finish', voiceStart);
    voiceLibrary.onSpeechStart = () => {
      uiStore.setLessonState(LessonState.IsListening);
    };

    voiceLibrary.onSpeechResults = (event) => {
      const wordIndex = uiStore.wordIndex;

      const cw = wordsStore.words[wordIndex];
      uiStore.setLessonState(LessonState.IsInactive);

      //checkAnswer && checkArticle
      if (extractArticle(event.value) === cw.article) {
        wordsStore.incrementSlotForWord(cw.value);
        console.log(cw);
      }
      wordsStore.updateTimeStampForWord(cw.value);

      if (wordIndex < wordsStore.words.length - 1) {
        uiStore.setWordIndex(wordIndex + 1);
      } else {
        uiStore.setLessonState(LessonState.IsFinished);
      }
    };

    voiceLibrary.onSpeechError = () => {
      const wordIndex = uiStore.wordIndex;

      const cw = wordsStore.words[wordIndex];
      uiStore.setLessonState(LessonState.IsSpeaking);
      repeatWord('Bitte wiederhole den Artikel für', cw.value);
    };

    return function cleanup() {
      console.error('cleanup');
      ttsLibrary.stop();
      ttsLibrary.removeEventListener('tts-finish', voiceStart);
      voiceLibrary.removeAllListeners();
      voiceLibrary.destroy();
    };
  }, [wordsStore, uiStore]);

  function speakWord(wordValue) {
    console.error('speakWord');
    ttsLibrary.speak(wordValue);
  }

  function repeatWord(prefixText, wordValue) {
    console.error('repeatWord');
    ttsLibrary.speak(prefixText + ',,' + wordValue);
  }

  return (
    <View style={styles.word}>
      {/* <WordImage /> */}
      <WordValue value={currentWord.value} />
    </View>
  );
}

export default observer(Word);
