import React, {useState, useEffect, useRef, useContext} from 'react';
import {View, Text, Button} from 'react-native';

import ttsLibrary from 'react-native-tts';
import voiceLibrary from '@react-native-community/voice';
import extractArticle from '../libs/extractArticle';

import {observer} from 'mobx-react';
import WordsStore from '../stores/WordsStore';
import styles from '../styles/wordStyle';

import '../styles/wordStyle';

function Word() {
  const [wordIndex, setWordIndex] = useState(0);

  const wordIndexRef = useRef<number>();
  wordIndexRef.current = wordIndex;

  const wordsStore = useContext(WordsStore);
  const currentWord = wordsStore.words[wordIndex];

  useEffect(() => {
    if (wordIndexRef.current > 0) {
      speakWord(currentWord.value);
    }
  }, [currentWord.value]);

  useEffect(() => {
    const voiceStart = () => voiceLibrary.start('de-DE');

    ttsLibrary.addEventListener('tts-finish', voiceStart);

    voiceLibrary.onSpeechResults = (event) => {
      const cw = wordsStore.words[wordIndexRef.current];

      //checkAnswer && checkArticle
      if (extractArticle(event.value) === cw.article) {
        wordsStore.incrementSlotForWord(cw.value);
        console.log(cw);
      }
      wordsStore.updateTimeStampForWord(cw.value);

      if (wordIndexRef.current < wordsStore.words.length - 1) {
        setWordIndex((wi) => wi + 1);
      }
    };

    voiceLibrary.onSpeechError = () => {
      const cw = wordsStore.words[wordIndexRef.current];
      repeatWord('Bitte wiederhole den Artikel für', cw.value);
    };

    return function cleanup() {
      ttsLibrary.removeEventListener('tts-finish', voiceStart);
      voiceLibrary.onSpeechResults = undefined;
      voiceLibrary.onSpeechError = undefined;
    };
  }, [wordsStore]);

  function speakWord(wordValue) {
    ttsLibrary.speak(wordValue);
  }
  function repeatWord(prefixText, wordValue) {
    ttsLibrary.speak(prefixText + ',,' + wordValue);
  }

  return (
    <View>
      <View style={styles.wrongArticle}>
        <Text>Word Component</Text>
      </View>
      <Text>{currentWord.value}</Text>
      <Button
        title="begin learning"
        onPress={() => {
          if (wordIndex === 0) {
            speakWord(currentWord.value);
          }
        }}
      />
    </View>
  );
}

//extended component (observer with word)
export default observer(Word);
