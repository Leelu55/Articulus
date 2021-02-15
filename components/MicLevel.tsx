import React, {useEffect} from 'react';
import {View, StyleSheet, PermissionsAndroid} from 'react-native';
import {observer} from 'mobx-react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import RNSoundLevel from 'react-native-sound-level';
import settings from '../libs/settings.json';

function startMic(animValue: Animated.SharedValue<number>) {
  console.log('start');
  RNSoundLevel.start();
  RNSoundLevel.onNewFrame = (data: any) => {
    // see "Returned data" section below
    animValue.value = data.value;
    console.log(data.value);
  };
}

function MicLevel({isActive, width}: {isActive: boolean; width: number}) {
  const animValue = useSharedValue(-160);

  useEffect(() => {
    console.log({isActive});
    if (!isActive) {
      return;
    }

    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO).then(
      (hasPermission) => {
        console.log({hasPermission});
        if (hasPermission) {
          startMic(animValue);
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ).then(() => startMic(animValue));
        }
      },
    );

    return () => {
      console.log('stop');
      RNSoundLevel.stop();
    };
  }, [animValue, isActive]);

  const animStyle = useAnimatedStyle(() => {
    const animSize = withTiming(
      interpolate(animValue.value, [-160, 0], [0, width]),
      {duration: 100, easing: Easing.inOut(Easing.linear)},
    );

    return {
      width: animSize,
    };
  }, [animValue]);

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      height: 20,
      borderWidth: 1,
    },
    micLevel: {
      backgroundColor: settings.colors.primary.normal,
      height: 20,
    },
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.micLevel, animStyle]} />
    </View>
  );
}
export default observer(MicLevel);
