/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef} from 'react';
import {Animated, View} from 'react-native';
import styles from '../styles/wordStyle';
import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {LessonState} from '../stores/UIStore';

export const ICONS = {
  [LessonState.IsInitial]: 'assistive-listening-systems',
  [LessonState.IsListening]: 'microphone',
  [LessonState.IsSpeaking]: 'volume-down',
  [LessonState.IsRepeating]: 'volume-down',
  [LessonState.IsPaused]: 'coffee',
  [LessonState.IsFinished]: 'flag-checkered',
};

export const COLORS = {
  [LessonState.IsInitial]: 'black',
  [LessonState.IsListening]: '#00bfff',
  [LessonState.IsSpeaking]: '#ffa500',
  [LessonState.IsRepeating]: '#ffa500',
  [LessonState.IsPaused]: 'lightgrey',
  [LessonState.IsFinished]: 'green',
};

function LessonStateIndicator() {
  const fadeAnim = useRef(new Animated.Value(1.1)).current; // Initial value for opacity: 0
  const lessonState: number = useContext(UIStore).lessonState.valueOf();

  React.useEffect(() => {
    if (lessonState === LessonState.IsListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1.4,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, lessonState]);

  return (
    <View style={{marginBottom: 20}}>
      <View // Special animatable View
        style={[
          styles.lessonStateIndicator,
          {
            backgroundColor: COLORS[lessonState],
            zIndex: 1,
            position: 'absolute',
          }, // Bind opacity to animated value
        ]}>
        <FontAwesomeIcon icon={ICONS[lessonState]} size={60} color="white" />
      </View>
      <Animated.View // Special animatable View
        style={[
          styles.lessonStateIndicator,
          {
            backgroundColor: COLORS[lessonState],
            opacity: 0.4,
            scaleX: fadeAnim,
            scaleY: fadeAnim,
          }, // Bind opacity to animated value
        ]}
      />
    </View>
  );
}

export default observer(LessonStateIndicator);
