/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import sharedStyles from '../../styles/sharedStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function FlagLayer({animFlag, animFlagOpacity}) {
  return (
    <View
      pointerEvents="none"
      style={[
        sharedStyles.viewVertical,
        {
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 1,
        },
      ]}>
      <Animated.View
        style={[
          styles.finishedIconWrapper,
          {
            opacity: animFlagOpacity.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 1],
            }),
            transform: [
              {
                scale: animFlag.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}>
        <FontAwesomeIcon icon="flag-checkered" size={150} color="white" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  finishedIconWrapper: {
    borderRadius: 1000,
    backgroundColor: 'grey',
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
