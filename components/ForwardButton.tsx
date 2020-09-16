import React, {useContext} from 'react';
import {TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faForward} from '@fortawesome/fontawesome-free-solid';

import UIStore, {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';

function ForwardButton() {
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
        if (wordIndex < wordsStore.lessonWords.length - 1) {
          uiStore.setWordIndex(wordIndex + 1);
          uiStore.setLessonState(LessonState.IsSpeaking);
        } else {
          uiStore.setLessonState(LessonState.IsFinished);
        }
      }}>
      <FontAwesomeIcon icon="forward" size={20} color="white" />
    </TouchableHighlight>
  );
}

export default observer(ForwardButton);
