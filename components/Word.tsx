import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Button} from 'react-native';

import model from '../model/model.json';
import ttsLibrary from 'react-native-tts';
import voiceLibrary from '@react-native-community/voice';
import extractArticle from '../libs/extractArticle';

export default function Word() {
  const [wordIndex, setWordIndex] = useState(0);

  const wordIndexRef = useRef<number>();
  wordIndexRef.current = wordIndex;

  const currentWord = model.words[wordIndex];
  useEffect(() => {
    speakWord(currentWord.value);
  }, [currentWord.value]);

  useEffect(() => {
    const voiceStart = () => voiceLibrary.start('de-DE');

    ttsLibrary.addEventListener('tts-finish', voiceStart);

    voiceLibrary.onSpeechResults = (event) => {
      console.error({
        event,
        wordIndexRefCurrent: wordIndexRef.current,
        modelWordsLength: model.words.length,
      });


      console.log(
        'correct article:',
        {
          currentWordValue: model.words[wordIndexRef.current].value,
          eventValue: event.value,
          extractArticleEventValue: extractArticle(event.value),
          currentWordArticle: model.words[wordIndexRef.current].article,
        },
        extractArticle(event.value) ===
          model.words[wordIndexRef.current].article,
      );

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

  return (
    <View>
      <Text>Word Component</Text>
      <Text>{currentWord.value}</Text>
      <Button
        title="next"
        onPress={() => {
          setWordIndex((wi) => wi + 1);
        }}
      />
    </View>
  );
}
