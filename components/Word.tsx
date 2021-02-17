import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import {WordValue} from './WordValue';
import WordsStore from '../stores/WordsStore';

import * as audioVoice from '../libs/audioVoice';
import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import {WordImage} from './WordImage';
import nextWord from '../libs/nextWord';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  word: {
    flexDirection: 'column',
    //margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {flexDirection: 'row', flex: 1},
});

function Word() {
  const uiStore = useContext(UIStore);

  const wordsStore = useContext(WordsStore);

  const currentLessonWord = wordsStore.lessonWords[uiStore.wordIndex];
  const lessonState = uiStore.lessonState;

  useEffect(() => {
    audioVoice.setup(uiStore);
    if (uiStore.lessonState !== LessonState.IsDemo) {
      uiStore.setLessonState(LessonState.IsSpeaking);

      // console.log(uiStore.lessonState);
      // uiStore.setIsDemoShown();
      // uiStore.setLessonState(LessonState.IsSpeaking);
    }
    return audioVoice.cleanup;
  }, [uiStore, wordsStore]);

  useEffect(() => {
    uiStore.resetRepeatCount();
  }, [currentLessonWord.value, uiStore]);

  useEffect(() => {
    //console.error('useEffect', lessonState);
    if (lessonState === LessonState.IsPaused) {
      audioVoice.voiceStop();
      audioVoice.stopSpeakWord();
    } else if (lessonState === LessonState.IsSpeaking) {
      //console.error('Word: lessonState === LessonState.IsSpeaking');
      audioVoice.voiceStop();
      audioVoice.stopSpeakWord();
      audioVoice.speakWord(currentLessonWord.value);
    } else if (lessonState === LessonState.IsRepeating) {
      audioVoice.voiceStop();
      audioVoice.stopSpeakWord();

      const repeatWordMethod = () => {
        audioVoice.repeatWord('Nochmal ', currentLessonWord.value);
        uiStore.increaseRepeatCount();
      };

      const nextWordMethod = () => nextWord(uiStore, wordsStore);

      if (uiStore.repeatCount < 2) {
        repeatWordMethod();
      } else {
        nextWordMethod();
      }
    } else if (lessonState === LessonState.IsFinished) {
      audioVoice.voiceStop();
      audioVoice.stopSpeakWord();
    } else if (lessonState === LessonState.IsEvaluating) {
    }
  }, [currentLessonWord.value, uiStore, lessonState, wordsStore]);

  //sliding animation
  const animValue = useSharedValue(0);
  const windowWith = useWindowDimensions().width;

  useEffect(() => {
    animValue.value = -windowWith * uiStore.wordIndex;
  }, [animValue, uiStore.wordIndex, windowWith]);

  const animStyle = useAnimatedStyle(() => {
    const animTranslateX = withTiming(animValue.value, {
      duration: 100,
      easing: Easing.inOut(Easing.linear),
    });

    return {
      transform: [{translateX: animTranslateX}],
    };
  }, [animValue]);

  return (
    <Animated.View style={[styles.slider, animStyle]}>
      {wordsStore.lessonWords.map((word) => (
        <View style={[styles.word, {width: windowWith}]} key={word.value}>
          <WordImage imageUrl={word.imageUrl} />
          <WordValue value={word.value} />
        </View>
      ))}
    </Animated.View>
  );
}

export default observer(Word);
