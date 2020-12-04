/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import settings from '../libs/settings.json';

export default function StartScreenAnimation() {
  const anim1 = useRef(new Animated.Value(1)).current;
  const anim2 = useRef(new Animated.Value(1)).current;
  const anim3 = useRef(new Animated.Value(1)).current;

  const windowWidth = useWindowDimensions().width;
  const fontSize = windowWidth / 18;

  const styles = StyleSheet.create({
    appTitleWrapper: {
      position: 'absolute',
      opacity: 0.75,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 1000,
    },
    appTitle: {
      fontSize: fontSize,
      fontWeight: 'bold',
      color: 'white',
    },
  });

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim1, {
          toValue: 1.25,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(anim1, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(anim2, {
          toValue: 1.25,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(anim2, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(anim3, {
          toValue: 1.25,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(anim3, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [anim1, anim2, anim3]);

  return (
    <View
      style={{
        height: 120,
        width: 180,
      }}>
      <Animated.View
        style={[
          styles.appTitleWrapper,
          {
            scaleX: anim1,
            scaleY: anim1,
            translateX: 0,
            translateY: styles.appTitleWrapper.height * 0.3,
            backgroundColor: settings.colors.secondary.normal,
          },
        ]}>
        <Text style={styles.appTitle}>DER</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.appTitleWrapper,
          {
            scaleX: anim2,
            scaleY: anim2,
            translateX: 60,
            translateY: styles.appTitleWrapper.height,
            backgroundColor: settings.colors.secondary.dark,
          },
        ]}>
        <Text style={styles.appTitle}>DIE</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.appTitleWrapper,
          {
            scaleX: anim3,
            scaleY: anim3,
            translateX: 120,
            translateY: styles.appTitleWrapper.height * 0.3,
            backgroundColor: settings.colors.primary.normal,
          },
        ]}>
        <Text style={styles.appTitle}>DAS</Text>
      </Animated.View>
    </View>
  );
}
