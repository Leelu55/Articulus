import React from 'react';
import {Image, useWindowDimensions} from 'react-native';
import {StyleSheet, Animated} from 'react-native';

export default function CatImage({animCat}) {
  const windowWidth = useWindowDimensions().width;
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      resizeMode: 'center',
    },
  });

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
      <Image
        source={require('../../assets/halloween-5586567_1920.png')}
        style={styles.wrapper}
      />
    </Animated.View>
  );
}
