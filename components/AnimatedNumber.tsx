/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Animated, Text} from 'react-native';

// https://easings.net/#easeInOutBack
function easeInOutBack(x: number): number {
  const c1 = 1;
  const c2 = c1 * 1.5;

  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

function AnimatedNumber({
  to,
  duration = 1000,
  height = 20,
  color = 'black',
}: {
  to: number;
  duration: number;
  height: number;
  color: string;
}) {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const spacing = 10;
  const styles = StyleSheet.create({
    wrapper: {
      height: height + 20,
      overflow: 'hidden',
    },
    numbers: {
      transform: [{translateY: 0}],
      position: 'absolute',
      padding: spacing,
    },
    numberText: {
      fontSize: height * 0.75,
      fontWeight: 'bold',
      height: height,
      color: color,
    },
  });

  useEffect(() => {
    Animated.timing(bounceAnim, {
      toValue: to * -height,
      useNativeDriver: true,
      duration: duration,
      easing: easeInOutBack,
    }).start();
  }, [bounceAnim, duration, height, to]);

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.numberText, {opacity: 0, margin: spacing}]}>
        {to}
      </Text>
      <Animated.View
        style={[styles.numbers, {transform: [{translateY: bounceAnim}]}]}>
        {Array.from(Array(to + 1), (e, i) => {
          return (
            <Animated.Text
              style={[
                styles.numberText,
                {
                  opacity: bounceAnim.interpolate({
                    inputRange: [
                      -(i + 1) * height,
                      -i * height,
                      -(i - 1) * height,
                    ],
                    outputRange: [0, 1, 0],
                  }),
                },
              ]}
              key={i}>
              {i}
            </Animated.Text>
          );
        })}
      </Animated.View>
    </View>
  );
}

export default AnimatedNumber;
