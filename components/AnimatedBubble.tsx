import React, {useEffect, useRef} from 'react';
import {View, Animated, Easing, EasingFunction, StyleSheet} from 'react-native';

function AnimatedBubble({
  duration = 1000,
  maxSize = 50,
  color = 'red',
  delay = 0,
  positionRandom = true,
  easingFunction = Easing.inOut(Easing.linear),
  onAnimationEnd = undefined,
  doStart = false,
}: {
  duration: number;
  maxSize: number;
  color: string;
  delay: number;
  positionRandom: boolean;
  easingFunction?: EasingFunction;
  onAnimationEnd?: ({finished}) => void;
  doStart?: boolean;
}) {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (doStart) {
      Animated.timing(animValue, {
        toValue: 100,
        useNativeDriver: true,
        duration: duration,
        delay: delay,
        easing: easingFunction,
        //do other things after the animation
      }).start(onAnimationEnd);
    }
  }, [
    animValue,
    delay,
    doStart,
    duration,
    easingFunction,
    maxSize,
    onAnimationEnd,
  ]);

  const style = StyleSheet.create({
    wrapperRandom: {
      position: 'absolute' as 'absolute',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      marginLeft: -maxSize / 2,
      marginTop: -maxSize / 2,
    },
    wrapper: {},
    bubble: {
      borderRadius: 1000,
      borderColor: color,
      backgroundColor: color,
      width: maxSize,
      height: maxSize,
      elevation: 1000, // works on android
    },
  });

  const animationStyle = {
    opacity: animValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
    }),
    transform: [
      {
        scale: animValue.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1],
        }),
      },
    ],
  };

  return (
    <View style={positionRandom ? style.wrapperRandom : style.wrapper}>
      <Animated.View style={[style.bubble, animationStyle]} />
    </View>
  );
}

export default AnimatedBubble;
