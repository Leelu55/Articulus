import React, {useContext} from 'react';
import {TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faForward} from '@fortawesome/fontawesome-free-solid';

import UIStore, {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';

export function ForwardButton() {
  const wordIndex = useContext(UIStore).wordIndex;
  const wordsLength = useContext(WordsStore).words.length;
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  const lessonState = uiStore.lessonState;

  fontawesome.library.add(faForward);

  return (
    <TouchableHighlight
      style={styles.controlButton}
      onPress={() => {
        if (
          wordIndex < wordsStore.lessonWords.length &&
          lessonState !== LessonState.IsFinished
        ) {
          uiStore.setWordIndex(wordIndex + 1);
        }
      }}
      disabled={wordIndex === wordsLength - 1}>
      <FontAwesomeIcon icon="forward" size={20} color="white" />
    </TouchableHighlight>
  );
}
