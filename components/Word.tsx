import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import styles from '../styles/wordStyle';
import {WordValue} from './WordValue';
import WordsStore from '../stores/WordsStore';

import audioVoice from '../libs/audioVoice';
import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';
import {LessonState} from '../stores/UIStore';
import {WordImage} from './WordImage';

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
    //console.error('useEffect', lessonState);
    if (lessonState === LessonState.IsPaused) {
      audioVoice.voiceStop();
      audioVoice.stopSpeakWord();
    } else if (lessonState === LessonState.IsSpeaking) {
      audioVoice.voiceStop();
      audioVoice.stopSpeakWord();
      audioVoice.speakWord(currentLessonWord.value);
    } else if (lessonState === LessonState.IsRepeating) {
      audioVoice.voiceStop();
      audioVoice.stopSpeakWord();
      audioVoice.repeatWord(
        'Bitte wiederhole den Artikel für',
        currentLessonWord.value,
      );
    } else if (lessonState === LessonState.IsFinished) {
      audioVoice.voiceStop();
      audioVoice.stopSpeakWord();
    } else if (lessonState === LessonState.IsEvaluating) {
    }
  }, [currentLessonWord.value, uiStore, lessonState, wordsStore]);

  return (
    <View style={styles.word}>
      <WordValue value={currentLessonWord.value} />
      <WordImage imageUrl={currentLessonWord.imageUrl} />
    </View>
  );
}

export default observer(Word);
