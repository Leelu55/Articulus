import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

import model from "../model/model.json";
import Tts from 'react-native-tts';

export default function Word() {
  const [ wordIndex, setWordIndex ] = useState(0);
  const value = model.words[wordIndex].value;

  Tts.speak(value);
  //alert(model.words.length);

  return (
    <View>
      <Text>Word Component</Text>
      <Text>{value}</Text>
      <Button title="next" onPress= {() => {if (wordIndex < model.words.length - 1) setWordIndex(wordIndex => wordIndex+1)}}></Button>
    </View>
  );
}