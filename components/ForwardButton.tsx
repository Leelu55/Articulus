/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faForward} from '@fortawesome/fontawesome-free-solid';

import UIStore, {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import nextWord from '../libs/nextWord';

function ForwardButton() {
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  const isFinished = uiStore.lessonState === LessonState.IsFinished;

  fontawesome.library.add(faForward);

  return (
    <TouchableHighlight
      style={[
        styles.controlButton,
        {
          backgroundColor: isFinished ? 'lightgrey' : 'black',
        },
      ]}
      onPress={() => {
        nextWord(uiStore, wordsStore);
      }}
      disabled={isFinished}>
      <FontAwesomeIcon icon="forward" size={20} color="white" />
    </TouchableHighlight>
  );
}

export default observer(ForwardButton);
