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
  const marginHorizontal = windowWidth / 9;
  const fontSize = windowWidth / 9;

  const styles = StyleSheet.create({
    appTitleWrapper: {
      position: 'absolute',
      opacity: 0.75,
      width: windowWidth / 3.5,
      height: windowWidth / 3.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: windowWidth / 18,
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
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          styles.appTitleWrapper,
          {
            scaleX: anim1,
            scaleY: anim1,
            translateX: marginHorizontal,
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
            translateX: windowWidth / 2 - styles.appTitleWrapper.width / 2,
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
            translateX:
              windowWidth - marginHorizontal - styles.appTitleWrapper.width,
            translateY: styles.appTitleWrapper.height * 0.3,
            backgroundColor: settings.colors.primary.normal,
          },
        ]}>
        <Text style={styles.appTitle}>DAS</Text>
      </Animated.View>
    </View>
  );
}
