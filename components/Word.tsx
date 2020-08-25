import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Button} from 'react-native';

import model from '../model/model.json';
import ttsLibrary from 'react-native-tts';
import voiceLibrary from '@react-native-community/voice';

export default function Word() {
  const [wordIndex, setWordIndex] = useState(0);

  const wordIndexRef = useRef<number>();
  wordIndexRef.current = wordIndex;

  const value = model.words[wordIndex].value;

  useEffect(() => {
    speakWord(value);
  }, [value]);

  useEffect(() => {
    const voiceStart = () => voiceLibrary.start('de-DE');

    ttsLibrary.addEventListener('tts-finish', voiceStart);

    voiceLibrary.onSpeechResults = (event) => {
      console.error({
        event,
        wordIndexRefCurrent: wordIndexRef.current,
        modelWordsLength: model.words.length,
      });

      if (wordIndexRef.current < model.words.length - 1) {
        setWordIndex((wi) => wi + 1);
      }
    };

    voiceLibrary.onSpeechError = () => {
      repeatWord(
        'Bitte wiederhole den Artikel für',
        model.words[wordIndexRef.current].value,
      );
    };

    return function cleanup() {
      ttsLibrary.removeEventListener('tts-finish', voiceStart);
      voiceLibrary.onSpeechResults = undefined;
      voiceLibrary.onSpeechError = undefined;
    };
  }, []);

  const speakWord = (wordValue) => ttsLibrary.speak(wordValue);
  const repeatWord = (prefixText, wordValue) => {
    ttsLibrary.speak(prefixText + ',,' + wordValue);
  };

  console.log('render Word', value);
  return (
    <View>
      <Text>Word Component</Text>
      <Text>{value}</Text>
      <Button
        title="next"
        onPress={() => {
          setWordIndex((wi) => wi + 1);
        }}
      />
    </View>
  );
}