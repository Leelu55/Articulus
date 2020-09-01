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

function Word() {
  const uiStore = useContext(UIStore);

  const wordsStore = useContext(WordsStore);

  const currentWord = wordsStore.words[uiStore.wordIndex];

  useEffect(() => {
    speakWord(currentWord.value);
  }, [currentWord.value]);

  useEffect(() => {
    const voiceStart = () => voiceLibrary.start('de-DE');

    ttsLibrary.addEventListener('tts-finish', voiceStart);

    voiceLibrary.onSpeechResults = (event) => {
      const wordIndex = uiStore.wordIndex;

      const cw = wordsStore.words[wordIndex];

      //checkAnswer && checkArticle
      if (extractArticle(event.value) === cw.article) {
        wordsStore.incrementSlotForWord(cw.value);
        console.log(cw);
      }
      wordsStore.updateTimeStampForWord(cw.value);

      if (wordIndex < wordsStore.words.length - 1) {
        uiStore.setWordIndex(wordIndex + 1);
      }
    };

    voiceLibrary.onSpeechError = () => {
      const wordIndex = uiStore.wordIndex;

      const cw = wordsStore.words[wordIndex];
      repeatWord('Bitte wiederhole den Artikel für', cw.value);
    };

    return function cleanup() {
      ttsLibrary.removeEventListener('tts-finish', voiceStart);
      voiceLibrary.onSpeechResults = undefined;
      voiceLibrary.onSpeechError = undefined;
    };
  }, [wordsStore, uiStore]);

  function speakWord(wordValue) {
    ttsLibrary.speak(wordValue);
  }
  function repeatWord(prefixText, wordValue) {
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
