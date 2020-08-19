import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Button} from 'react-native';

import model from '../model/model.json';
import Tts from 'react-native-tts';
import Voice from '@react-native-community/voice';

export default function Word() {
  const [wordIndex, setWordIndex] = useState(0);

  const wordIndexRef = useRef<number>();
  wordIndexRef.current = wordIndex;

  const value = model.words[wordIndex].value;

  useEffect(() => {
    const voiceStart = () => Voice.start('de-DE');

    Tts.addEventListener('tts-finish', voiceStart);
    Tts.speak(value);

    return function cleanup() {
      Tts.removeEventListener('tts-finish', voiceStart);
    };
  });

  useEffect(() => {
    Voice.onSpeechResults = (/*event*/) => {
      /*
      console.error({
        event,
        wordIndexRefCurrent: wordIndexRef.current,
        modelWordsLength: model.words.length,
      });
      */

      if (wordIndexRef.current < model.words.length - 1) {
        // eslint-disable-next-line no-shadow
        setWordIndex((wordIndex) => wordIndex + 1);
      }
    };

    return function cleanup() {
      Voice.onSpeechResults = undefined;
    };
  });

  return (
    <View>
      <Text>Word Component</Text>
      <Text>{value}</Text>
      <Button
        title="next"
        onPress={() => {
          // eslint-disable-next-line no-shadow
          setWordIndex((wordIndex) => wordIndex + 1);
        }}
      />
    </View>
  );
}
