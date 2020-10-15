/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef} from 'react';
import {Animated, Pressable, View} from 'react-native';
import styles from '../styles/wordStyle';
import settings from '../libs/settings.json';

import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import audioVoice from '../libs/audioVoice';

export const ICONS = {
  [LessonState.IsInitial]: 'assistive-listening-systems',
  [LessonState.IsSpeaking]: 'volume-down',
  [LessonState.IsRepeating]: 'volume-down',
  [LessonState.IsWaitingForUserAction]: 'microphone',
  [LessonState.IsListening]: 'microphone',
  [LessonState.IsEvaluating]: 'check',
  [LessonState.IsPaused]: 'coffee',
  [LessonState.IsFinished]: 'flag-checkered',
};

export const COLORS = {
  [LessonState.IsInitial]: 'black',
  [LessonState.IsSpeaking]: '#ffa500',
  [LessonState.IsRepeating]: '#ffa500',
  [LessonState.IsWaitingForUserAction]: 'white',
  [LessonState.IsListening]: '#00bfff',
  [LessonState.IsEvaluating]: settings.colors.correctAnswer,
  [LessonState.IsPaused]: 'lightgrey',
  [LessonState.IsFinished]: settings.colors.correctAnswer,
};

function LessonStateIndicator() {
  const fadeAnim = useRef(new Animated.Value(1.1)).current; // Initial value for opacity: 0
  const uiStore = useContext(UIStore);
  const lessonState: number = uiStore.lessonState.valueOf();
  const wordsStore = useContext(WordsStore);

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

  let icon = ICONS[lessonState];
  const iconColor =
    !uiStore.autoMode &&
    uiStore.lessonState === LessonState.IsWaitingForUserAction
      ? '#00bfff'
      : 'white';
  let bgColor = COLORS[lessonState];
  const currentWord = wordsStore.lessonWords[uiStore.wordIndex];
  if (
    lessonState === LessonState.IsEvaluating &&
    currentWord.answerArticle !== currentWord.article
  ) {
    icon = 'times';
    bgColor = settings.colors.wrongAnswer;
  }
  function onPress() {
    audioVoice.voiceStart();
  }
  const isDisabled = uiStore.lessonState !== LessonState.IsWaitingForUserAction;

  return (
    <Pressable disabled={isDisabled} onPress={onPress}>
      <View // Special animatable View
        style={[
          styles.lessonStateIndicator,
          {
            backgroundColor: bgColor,
            borderWidth: 5,
            borderColor:
              uiStore.lessonState === LessonState.IsWaitingForUserAction
                ? '#00bfff'
                : bgColor,
            zIndex: 1,
            position: 'absolute',
          }, // Bind opacity to animated value
        ]}>
        <FontAwesomeIcon icon={icon} size={60} color={iconColor} />
      </View>
      <Animated.View // Special animatable View
        style={[
          styles.lessonStateIndicator,
          {
            backgroundColor: bgColor,
            opacity: 0.4,
            scaleX: fadeAnim,
            scaleY: fadeAnim,
          }, // Bind opacity to animated value
        ]}
      />
    </Pressable>
  );
}

export default observer(LessonStateIndicator);
