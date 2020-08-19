import React from 'react';
import { View, Text } from 'react-native';

import model from "../model/model.json";

export default function Word() {
  return (
    <View>
      <Text>Word Component</Text>
      <Text>{model.words[0].value}</Text>

    </View>
  );
}