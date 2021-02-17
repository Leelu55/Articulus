/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef} from 'react';
import {Animated, Pressable, StyleSheet, View, Text} from 'react-native';
import settings from '../libs/settings.json';

import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import * as audioVoice from '../libs/audioVoice';
import HintBubble from './HintBubble';

export const ICONS = {
  [LessonState.IsInitial]: 'volume-down',
  [LessonState.IsSpeaking]: 'volume-down',
  [LessonState.IsRepeating]: 'volume-down',
  [LessonState.IsWaitingForUserAction]: 'microphone',
  [LessonState.IsListening]: 'microphone',
  [LessonState.IsEvaluating]: 'check',
  [LessonState.IsPaused]: 'coffee',
  [LessonState.IsFinished]: 'flag-checkered',
  [LessonState.IsDemo]: 'microphone',
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
  [LessonState.IsDemo]: 'white',
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
  [LessonState.IsDemo]: settings.colors.primary.light,
};

function LessonStateIndicator({
  lessonStateValue,
  isInteractive,
  iconSize,
  chosenArticle = null,
  isCorrectArticle = undefined,
}: {
  lessonStateValue: string;
  isInteractive: boolean;
  iconSize: number;
  chosenArticle?: string;
  isCorrectArticle?: boolean;
}) {
  const fadeAnim = useRef(new Animated.Value(1.1)).current; // Initial value for opacity: 0
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  React.useEffect(() => {
    if (
      (lessonStateValue === LessonState.IsListening &&
        chosenArticle === null) ||
      lessonStateValue === LessonState.IsDemo
    ) {
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
  }, [chosenArticle, fadeAnim, lessonStateValue]);

  let icon = ICONS[lessonStateValue];
  let iconColor = ICON_COLORS[lessonStateValue];

  let bgColor = COLORS[lessonStateValue];
  const currentWord = wordsStore.lessonWords[uiStore.wordIndex];
  if (
    lessonStateValue === LessonState.IsEvaluating &&
    chosenArticle !== currentWord.article
  ) {
    icon = 'times';
    bgColor = settings.colors.wrongAnswer;
  }

  if (chosenArticle !== null) {
    icon = isCorrectArticle ? ICONS[LessonState.IsEvaluating] : 'times';
    iconColor = ICON_COLORS[LessonState.IsEvaluating];
    bgColor = isCorrectArticle
      ? settings.colors.correctAnswer
      : settings.colors.wrongAnswer;
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
      <HintBubble
        hintText={
          <Text>
            Sprich Artikel und Wort{' '}
            <Text style={{fontWeight: 'bold'}}>
              "{currentWord.article} {currentWord.value}"
            </Text>{' '}
            deutlich und erst, wenn das Mikrofon lila pulsiert.
          </Text>
        }
        zIndex={2}
        position="topLeft"
        offsetX={50}
        offsetY={100}
        lineLength={130}
        delay={750}
      />
    </Pressable>
  );
}

export default observer(LessonStateIndicator);
