/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import UIStore, {LessonState} from '../stores/UIStore';
import settings from '../libs/settings.json';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
  Easing,
} from 'react-native-reanimated';

function ProgressBar({
  doAnimate = false,
  chosenArticle,
}: {
  doAnimate: boolean;
  chosenArticle: string;
}) {
  const wordIndex = useContext(UIStore).wordIndex;
  const wordsStore = useContext(WordsStore);
  const lessonWords = wordsStore.lessonWords;
  const uiStore = useContext(UIStore);
  const animValue = useSharedValue(0, !doAnimate);

  useEffect(() => {
    if (doAnimate) {
      animValue.value = 100;
    } else {
      animValue.value = 0;
    }
  }, [animValue, doAnimate]);

  const animStyle = useAnimatedStyle(() => {
    const animSize = withTiming(
      interpolate(animValue.value, [0, 100], [3, 50]),
      {duration: doAnimate ? 200 : 0, easing: Easing.inOut(Easing.linear)},
    );

    return {
      width: animSize,
      height: animSize,
    };
  }, [animValue, doAnimate]);

  let backgroundCurrentWord = 'grey';
  if (chosenArticle !== null) {
    backgroundCurrentWord =
      chosenArticle === wordsStore.lessonWords[uiStore.wordIndex].article
        ? settings.colors.correctAnswer
        : settings.colors.wrongAnswer;
  }

  const styles = StyleSheet.create({
    progressBar: {
      flex: 1,
      flexDirection: 'row',
      height: 20,
    },
    currentWordMarker: {
      backgroundColor: backgroundCurrentWord,
      borderRadius: 100,
      width: 5,
      height: 5,
    },
  });

  return (
    <View style={styles.progressBar}>
      {lessonWords.map(function (lessonWord, index) {
        const wordWithinRange =
          index <= wordIndex || uiStore.lessonState === LessonState.IsFinished;
        const correctAnswer = lessonWord.answerArticle === lessonWord.article;
        let bgColor = 'lightgrey';

        if (wordWithinRange && lessonWord.answerArticle !== null) {
          bgColor = correctAnswer
            ? settings.colors.correctAnswer
            : settings.colors.wrongAnswer;
        }

        let borderTopLeftRadius = 0;
        let borderBottomLeftRadius = 0;
        let borderTopRightRadius = 0;
        let borderBottomRightRadius = 0;

        if (index === 0) {
          borderTopLeftRadius = 10;
          borderBottomLeftRadius = 10;
        }
        if (index === lessonWords.length - 1) {
          borderTopRightRadius = 10;
          borderBottomRightRadius = 10;
        }

        return (
          <View
            key={lessonWord.value}
            style={{
              flex: 1,
              backgroundColor: bgColor,
              borderBottomLeftRadius,
              borderTopLeftRadius,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderColor: 'black',
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            {index === wordIndex &&
              lessonWord.answerArticle === null &&
              uiStore.lessonState !== LessonState.IsFinished && (
                <Animated.View style={[styles.currentWordMarker, animStyle]} />
              )}
            {lessonWords[index].answerArticle === null &&
              (index < wordIndex ||
                uiStore.lessonState === LessonState.IsFinished) && (
                <FontAwesomeIcon
                  icon="minus"
                  size={7}
                  color="black"
                  style={{opacity: 0.6}}
                />
              )}
          </View>
        );
      })}
    </View>
  );
}
export default observer(ProgressBar);
