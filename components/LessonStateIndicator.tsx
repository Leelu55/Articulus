/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef} from 'react';
import {Animated, Pressable, StyleSheet, View} from 'react-native';
import settings from '../libs/settings.json';

import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import * as audioVoice from '../libs/audioVoice';

export const ICONS = {
  [LessonState.IsInitial]: 'volume-down',
  [LessonState.IsSpeaking]: 'volume-down',
  [LessonState.IsRepeating]: 'volume-down',
  [LessonState.IsWaitingForUserAction]: 'microphone',
  [LessonState.IsListening]: 'microphone',
  [LessonState.IsEvaluating]: 'check',
  [LessonState.IsPaused]: 'coffee',
  [LessonState.IsFinished]: 'flag-checkered',
};

export const ICON_COLORS = {
  [LessonState.IsInitial]: 'black',
  [LessonState.IsSpeaking]: 'black',
  [LessonState.IsRepeating]: 'black',
  [LessonState.IsWaitingForUserAction]: 'white',
  [LessonState.IsListening]: 'white',
  [LessonState.IsEvaluating]: 'white',
  [LessonState.IsPaused]: 'black',
  [LessonState.IsFinished]: 'black',
};

export const COLORS = {
  [LessonState.IsInitial]: 'black',
  [LessonState.IsSpeaking]: 'lightgrey',
  [LessonState.IsRepeating]: 'lightgrey',
  [LessonState.IsWaitingForUserAction]: settings.colors.primary.light,
  [LessonState.IsListening]: settings.colors.primary.light,
  [LessonState.IsEvaluating]: settings.colors.correctAnswer,
  [LessonState.IsPaused]: 'lightgrey',
  [LessonState.IsFinished]: 'lightgrey',
};

function LessonStateIndicator({
  lessonStateValue,
  isInteractive,
  iconSize,
}: {
  lessonStateValue: string;
  isInteractive: boolean;
  iconSize: number;
}) {
  const fadeAnim = useRef(new Animated.Value(1.1)).current; // Initial value for opacity: 0
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);

  React.useEffect(() => {
    if (lessonStateValue === LessonState.IsListening) {
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
  }, [fadeAnim, lessonStateValue]);

  let icon = ICONS[lessonStateValue];
  let iconColor = ICON_COLORS[lessonStateValue];

  let bgColor = COLORS[lessonStateValue];
  const currentWord = wordsStore.lessonWords[uiStore.wordIndex];
  if (
    lessonStateValue === LessonState.IsEvaluating &&
    currentWord.answerArticle !== currentWord.article
  ) {
    icon = 'times';
    bgColor = settings.colors.wrongAnswer;
  }
  function onPress() {
    if (uiStore.lessonState === LessonState.IsWaitingForUserAction) {
      audioVoice.voiceStart();
      return;
    }
    if (uiStore.lessonState === LessonState.IsListening) {
      audioVoice.voiceStop();
      uiStore.setLessonState(LessonState.IsWaitingForUserAction);
    }
  }
  const isDisabled =
    /* uiStore.autoMode || */
    ![LessonState.IsWaitingForUserAction, LessonState.IsListening].includes(
      uiStore.lessonState,
    ) && isInteractive;

  const style = StyleSheet.create({
    lessonStateIndicator: {
      backgroundColor: bgColor,
      width: iconSize * 2,
      height: iconSize * 2,
      borderRadius: iconSize,
      marginLeft: 30,
      marginRight: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <Pressable disabled={isDisabled} onPress={onPress}>
      <View // Special animatable View
        style={[
          style.lessonStateIndicator,
          {
            borderColor:
              uiStore.lessonState === LessonState.IsWaitingForUserAction
                ? 'plum'
                : bgColor,
            zIndex: 1,
            position: 'absolute',
          }, // Bind opacity to animated value
        ]}>
        <FontAwesomeIcon icon={icon} size={iconSize} color={iconColor} />
      </View>
      <Animated.View // Special animatable View
        style={[
          style.lessonStateIndicator,
          {
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
