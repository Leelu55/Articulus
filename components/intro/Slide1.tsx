/* eslint-disable react-native/no-inline-styles */
import UnicornCat from '../SVGs/UnicornCat';
import * as React from 'react';
import StartScreenAnimation from '../StartScreenAnimation';
import {View} from 'react-native';

export default function () {
  return (
    <View style={{alignItems: 'center'}}>
      <StartScreenAnimation />
      <UnicornCat style={{alignSelf: 'center', marginTop: 20}} />
    </View>
  );
}
