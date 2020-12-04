import UnicornCat from '../SVGs/UnicornCat';
import * as React from 'react';
import StartScreenAnimation from '../StartScreenAnimation';
import {View} from 'react-native';
import {useWindowDimensions} from 'react-native';

export default function () {
  const windowWidth = useWindowDimensions().width;

  return (
    <View style={{alignItems: 'center'}}>
      <StartScreenAnimation />
      <UnicornCat style={{alignSelf: 'center', marginTop: 20}} />
    </View>
  );
}
