import React from 'react';
import { View, Text } from 'react-native';

import model from "../model/model.json";
import Tts from 'react-native-tts';

export default function Word() {
  const value = model.words[0].value;
  Tts.speak(value);

  return (
    <View>
      <Text>Word Component</Text>
      <Text>{value}</Text>

    </View>
  );
}