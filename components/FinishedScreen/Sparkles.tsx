import React from 'react';
import {View, StyleSheet} from 'react-native';
import AnimatedBubble from '../AnimatedBubble';
import settings from '../../libs/settings.json';

export default function Sparkles({doCountAnim}: {doCountAnim: boolean}) {
  const getSparklesJsx = (color: string, numSparkles: number) => {
    let sparklesJsx = [];
    for (let i = 0; i < numSparkles; i++) {
      sparklesJsx.push(
        <AnimatedBubble
          duration={2000}
          maxSize={30}
          color={color}
          delay={i * (1000 / numSparkles)}
          key={i}
          positionRandom={true}
          easingFunction={(x: number): number => {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
          }}
          doStart={doCountAnim}
        />,
      );
    }
    return sparklesJsx;
  };

  const sparklesStyles = StyleSheet.create({
    wrapper: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: -1,
    },
  });
  return (
    <View style={sparklesStyles.wrapper}>
      {getSparklesJsx(settings.colors.primary.normal, 100)}
      {getSparklesJsx(settings.colors.secondary.normal, 100)}
    </View>
  );
}
