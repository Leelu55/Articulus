import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import styles from '../styles/wordStyle';
import {WordValue} from './WordValue';
import WordsStore from '../stores/WordsStore';

import audioVoice from '../libs/audioVoice';
import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';
import {LessonState} from '../stores/UIStore';

function Word() {
  const uiStore = useContext(UIStore);

  const wordsStore = useContext(WordsStore);

  const currentLessonWord = wordsStore.lessonWords[uiStore.wordIndex];

  useEffect(() => {
    audioVoice.setup(uiStore, wordsStore);
    return audioVoice.cleanup;
  }, [uiStore, wordsStore]);

  useEffect(() => {
    uiStore.setLessonState(LessonState.IsSpeaking);
    audioVoice.speakWord(currentLessonWord.value);
  }, [currentLessonWord.value, uiStore]);


  return (
    <View style={styles.word}>
      {/* <WordImage /> */}
      <WordValue value={currentLessonWord.value} />
    </View>
  );
}

export default observer(Word);
