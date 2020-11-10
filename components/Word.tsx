import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {WordValue} from './WordValue';
import WordsStore from '../stores/WordsStore';

import * as audioVoice from '../libs/audioVoice';
import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import {WordImage} from './WordImage';
import nextWord from '../libs/nextWord';

const styles = StyleSheet.create({
  word: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Word() {
  const uiStore = useContext(UIStore);

  const wordsStore = useContext(WordsStore);

  const currentLessonWord = wordsStore.lessonWords[uiStore.wordIndex];
  const lessonState = uiStore.lessonState;

  useEffect(() => {
    audioVoice.setup(uiStore, wordsStore);
    uiStore.setLessonState(LessonState.IsSpeaking);
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
      if (uiStore.repeatCount < 2) {
        audioVoice.repeatWord(
          'Bitte wiederhole den Artikel für',
          currentLessonWord.value,
        );
        uiStore.increaseRepeatCount();
      } else {
        nextWord(uiStore, wordsStore);
      }
    } else if (lessonState === LessonState.IsFinished) {
      audioVoice.voiceStop();
      audioVoice.stopSpeakWord();
    } else if (lessonState === LessonState.IsEvaluating) {
    }
  }, [currentLessonWord.value, uiStore, lessonState, wordsStore]);

  return (
    <View style={styles.word}>
      <WordImage imageUrl={currentLessonWord.imageUrl} />
      <WordValue value={currentLessonWord.value} />
    </View>
  );
}

export default observer(Word);
