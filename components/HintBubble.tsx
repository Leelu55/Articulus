import React, {ReactNode, useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import UIStore from '../stores/UIStore';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';

function HintBubble({
  hintText,
  zIndex = 0,
  position,
  offsetX,
  offsetY,
  lineLength = 20,
  delay = 0,
}: {
  hintText: string | ReactNode;
  zIndex?: number;
  position?: string;
  offsetX?: number;
  offsetY?: number;
  lineLength?: number;
  delay?: number;
}) {
  const uiStore = useContext(UIStore);
  const animValue = useSharedValue(0);
  useEffect(() => {
    animValue.value = 1;
  }, [animValue]);

  const animStyle = useAnimatedStyle(() => {
    const scale = withDelay(
      delay,
      withTiming(interpolate(animValue.value, [0, 1], [0.5, 1]), {
        duration: 500,
        easing: Easing.elastic(4),
      }),
    );
    const opacity = withDelay(
      delay,
      withTiming(interpolate(animValue.value, [0, 1], [0, 1]), {
        duration: 500,
      }),
    );
    return {
      transform: [{scale}],
      opacity,
    };
  }, [animValue]);
  if (uiStore.isDemoShown) {
    return null;
  }

  const bubbleColor = 'green';

  const styles = StyleSheet.create({
    HintBubble: {
      flexDirection: ['topLeft', 'topRight'].includes(position)
        ? 'column-reverse'
        : 'column',
      position: 'absolute',
      bottom: ['topLeft', 'topRight'].includes(position) ? offsetY : 0,
      top: ['bottomLeft', 'bottomRight'].includes(position) ? offsetY : 0,
      right: ['bottomRight', 'topRight'].includes(position) ? offsetX : null,
      left: ['bottomLeft', 'topLeft'].includes(position) ? offsetX : null,
      width: 200,
      alignItems: ['topLeft', 'bottomLeft'].includes(position)
        ? 'flex-start'
        : 'flex-end',
    },
    HintBubbleCircle: {
      backgroundColor: bubbleColor,
      borderRadius: 100,
      width: 16,
      height: 16,
      transform: [
        {translateX: ['bottomRight', 'topRight'].includes(position) ? 4 : -4},
        {
          translateY: ['topLeft', 'topRight'].includes(position) ? -1 : 1,
        },
      ],
    },
    HintBubbleLine: {
      backgroundColor: bubbleColor,
      height: lineLength,
      width: 8,
    },
    HintBubbleTextWrapper: {
      backgroundColor: bubbleColor,
      padding: 15,
      borderBottomRightRadius: position === 'topRight' ? 0 : 10,
      borderBottomLeftRadius: position === 'topLeft' ? 0 : 10,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    HintBubbleText: {color: 'white', fontSize: 15},
  });
  return (
    <Animated.View style={[styles.HintBubble, {zIndex: zIndex}, animStyle]}>
      <View style={styles.HintBubbleCircle} />
      <View style={styles.HintBubbleLine} />
      <View style={styles.HintBubbleTextWrapper}>
        <Text style={styles.HintBubbleText}>{hintText}</Text>
      </View>
    </Animated.View>
  );
}
export default HintBubble;
