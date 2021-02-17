import React, {useEffect} from 'react';
import {Text, StyleSheet, useWindowDimensions} from 'react-native';
import settings from '../libs/settings.json';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';

function SnackBar() {
  const animValue = useSharedValue(0);
  useEffect(() => {
    animValue.value = 1;
  }, [animValue]);

  const animStyle = useAnimatedStyle(() => {
    const translateY = withDelay(
      1000,
      withTiming(interpolate(animValue.value, [0, 1], [-50, 40]), {
        duration: 500,
        easing: Easing.elastic(4),
      }),
    );

    return {
      transform: [{translateY}],
    };
  }, [animValue]);
  const windowWith = useWindowDimensions().width;
  const snackBarWidth = 300;
  const styles = StyleSheet.create({
    SnackBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: settings.colors.primary.superlight,
      padding: 10,
      position: 'absolute',
      width: snackBarWidth,
      left: (windowWith - snackBarWidth) / 2,
      borderRadius: 10,
    },
    SnackBarText: {color: 'black', fontSize: 15},
    SnackBarFakeButton: {
      color: settings.colors.primary.dark,
      fontWeight: 'bold',
      fontSize: 15,
    },
  });
  return (
    <Animated.View style={[styles.SnackBar, animStyle]}>
      <Text style={styles.SnackBarText}>Klicke irgendwo um zu starten</Text>
      <Text style={styles.SnackBarFakeButton}>STARTEN</Text>
    </Animated.View>
  );
}
export default SnackBar;
