/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faForward} from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faForward);

import UIStore, {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import nextWord from '../libs/nextWord';

function ForwardButton() {
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  const isFinished = uiStore.lessonState === LessonState.IsFinished;

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
