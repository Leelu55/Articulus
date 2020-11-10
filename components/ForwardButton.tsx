/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {TouchableHighlight, StyleSheet, Pressable} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faForward} from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faForward);

import UIStore, {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import nextWord from '../libs/nextWord';

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 5,
    padding: 5,
  },
});

function ForwardButton() {
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  const isFinished = uiStore.lessonState === LessonState.IsFinished;

  return (
    <Pressable
      style={styles.wrapper}
      onPress={() => {
        nextWord(uiStore, wordsStore);
      }}
      disabled={isFinished}>
      <FontAwesomeIcon icon="forward" color="lightgrey" size={30} />
    </Pressable>
  );
}

export default observer(ForwardButton);
