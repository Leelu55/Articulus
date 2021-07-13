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
/**@module Components */
function AnimatedNumber({
  to,
  delay = 0,
  duration = 1000,
  height = 20,
  color = 'black',
  doStart = false,
}: {
  to: number;
  delay: number;
  duration: number;
  height: number;
  color: string;
  doStart?: boolean;
}) {
  // bounceAnim controls translateY for the outer numbers-container and opacity for the individual numbers during animation
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const spacing = 0;
  const styles = StyleSheet.create({
    wrapper: {
      height: height + spacing * 2,
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
      alignSelf: 'center',
    },
  });

  useEffect(() => {
    if (doStart) {
      Animated.timing(bounceAnim, {
        toValue: to * -height, // animate bounceAnim in such a way that "to" is visible in the end
        useNativeDriver: true,
        duration: duration,
        easing: easeInOutBack,
        delay: delay,
      }).start();
    }
  }, [bounceAnim, delay, doStart, duration, height, to]);

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.numberText, {opacity: 0, margin: spacing}]}>
        {to}
      </Text>

      {/* outer numbers-container */}
      <Animated.View
        style={[
          styles.numbers,
          {
            // by animating translateY on the container, we move the
            // container inside the visible "window" up and down
            //
            // Given the height for the numbers is 20 pixels, then:
            // - number 1 is visible at translateY = 0
            // - number 2 is visible at translateY = -1 * 20 = -20
            // - number 3 is visible at translateY = -2 * 20 = -40
            // - number 4 is visible at translateY = -3 * 20 = -60
            // - ...

            transform: [{translateY: bounceAnim}],
          },
        ]}>
        {/* renders "to" numbers inside the container. "to" = 6 results in 6 numbers being rendered */}
        {Array.from(Array(to + 1), (e, i) => {
          return (
            <Animated.Text
              style={[
                styles.numberText,
                {
                  // control opacity of individual numbers for even smoother animation
                  opacity: bounceAnim.interpolate({
                    inputRange: [
                      -(i + 1) * height, // reduced opacity for the number preceding "to" number (i.e. 7)
                      -i * height, // full opacity for the "to" number (i.e. 8)
                      -(i - 1) * height, // reduced opacity for the number following "to" number (i.e. 9)
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
