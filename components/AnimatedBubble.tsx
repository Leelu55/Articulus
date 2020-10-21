import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';

function AnimatedBubble({
  duration = 1000,
  maxSize = 20,
  color = 'red',
  delay = 0,
  isFilled = true,
  positionRandom = true,
}: {
  duration: number;
  maxSize: number;
  color: string;
  delay: number;
  isFilled: boolean;
  positionRandom: boolean;
}) {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 100,
      useNativeDriver: true,
      duration: duration,
      delay: delay,
    }).start();
  }, [animValue, delay, duration, maxSize]);

  const style = {
    wrapperRandom: {
      position: 'absolute' as 'absolute',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
    },
    wrapper: {},
    bubble: {
      borderRadius: 1000,
      borderWidth: 3,
      borderColor: color,
      backgroundColor: isFilled ? color : 'transparent',
      width: maxSize,
      height: maxSize,
      elevation: 1000, // works on android
      opacity: animValue.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
      }),
      transform: [
        {
          scaleX: animValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
          }),
        },
        {
          scaleY: animValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
          }),
        },
      ],
    },
  };

  return (
    <View style={positionRandom ? style.wrapperRandom : style.wrapper}>
      <Animated.View style={style.bubble} />
    </View>
  );
}

export default AnimatedBubble;
