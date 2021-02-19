//TODO Remove

import React, {useEffect, useRef} from 'react';
import {Easing, View} from 'react-native';
import SelectorButton from './SelectorButton';
import sharedStyles from '../styles/sharedStyles';
import settings from '../libs/settings.json';
import {Animated} from 'react-native';

export function HintSelectorButtons(): JSX.Element {
  const startDelay = 500;
  return (
    <View
      pointerEvents="none"
      style={[
        sharedStyles.viewHorizontal,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          marginBottom: 20,
          flex: 1,
        },
      ]}>
      <HintSelectorButtonWrapper
        interval={2500}
        delay={startDelay}
        fromColorString={'rgb(211,211,211)'}
        toColorString={settings.colors.wrongAnswer}>
        <SelectorButton articleText="der" fontSize={25} />
      </HintSelectorButtonWrapper>
      <HintSelectorButtonWrapper
        interval={1500}
        delay={startDelay + 1000}
        fromColorString={'rgb(211,211,211)'}
        toColorString={settings.colors.wrongAnswer}>
        <SelectorButton articleText="die" fontSize={25} />
      </HintSelectorButtonWrapper>
      <HintSelectorButtonWrapper
        interval={500}
        delay={startDelay + 2000}
        fromColorString={'rgb(211,211,211)'}
        toColorString={settings.colors.correctAnswer}>
        <SelectorButton articleText="das" fontSize={25} />
      </HintSelectorButtonWrapper>
    </View>
  );
}
function HintSelectorButtonWrapper({
  children,
  delay,
  interval,
  fromColorString,
  toColorString,
}): JSX.Element {
  const animValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 100,
          duration: 100,
          delay: delay,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.delay(interval + 500),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [animValue, delay, interval]);

  return (
    <Animated.View
      style={[
        sharedStyles.articleButtonWrapper,
        {
          backgroundColor: animValue.interpolate({
            inputRange: [0, 100],
            outputRange: [fromColorString, toColorString],
          }),
        },
      ]}>
      {children}
    </Animated.View>
  );
}
