import React, {useContext} from 'react';
import {StyleSheet, Pressable, Text, View} from 'react-native';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faForward} from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faForward);

import UIStore, {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import nextWord from '../libs/nextWord';

const styles = StyleSheet.create({
  wrapperAll: {
    marginLeft: 5,
  },
  wrapper: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  pressable: {
    padding: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#bbb',
    fontWeight: 'bold',
    position: 'absolute',
    top: 35,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});

function ForwardButton() {
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  const isFinished = uiStore.lessonState === LessonState.IsFinished;

  return (
    <View style={styles.wrapperAll}>
      <View style={styles.wrapper}>
        <Pressable
          style={styles.pressable}
          android_ripple={{color: 'lightgrey'}}
          onPress={() => {
            nextWord(uiStore, wordsStore);
          }}
          disabled={isFinished}>
          <FontAwesomeIcon icon="forward" color="lightgrey" size={30} />
        </Pressable>
      </View>
      <Text style={styles.text}>skip</Text>
    </View>
  );
}

export default observer(ForwardButton);
