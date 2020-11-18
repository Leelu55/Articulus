import React from 'react';
import {useWindowDimensions} from 'react-native';
import {Animated} from 'react-native';
import UnicornCat from '../SVGs/UnicornCat';

export default function CatImage({animCat}) {
  const windowWidth = useWindowDimensions().width;

  return (
    <Animated.View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        transform: [
          {
            translateX: animCat.interpolate({
              inputRange: [0, 100],
              outputRange: [-windowWidth, 0],
            }),
          },
        ],
      }}>
      <UnicornCat />
      {/*
      <Image
        source={require('../../assets/halloween-5586567_1920.png')}
        style={styles.wrapper}
      /> */}
    </Animated.View>
  );
}
