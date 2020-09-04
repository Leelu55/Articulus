/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import UIStore from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAssistiveListeningSystems,
  faMicrophoneAlt,
  faUserCheck,
  faForward,
  faPause,
  faCheckCircle,
} from '@fortawesome/fontawesome-free-solid';

export const ICONS = {
  0: 'assistive-listening-systems',
  1: 'microphone-alt',
  2: 'user-check',
  3: 'check-circle',
};

export const COLORS = {
  0: '#00bfff',
  1: '#ffa500',
  2: '#ffff00',
  3: 'green',
};

function ControlBar() {
  const wordIndex = useContext(UIStore).wordIndex;
  const wordsLength = useContext(WordsStore).words.length;
  const lessonState: number = useContext(UIStore).lessonState.valueOf();
  fontawesome.library.add(
    faAssistiveListeningSystems,
    faMicrophoneAlt,
    faUserCheck,
    faForward,
    faPause,
    faCheckCircle,
  );

  return (
    <View style={styles.viewHorizontal}>
      <TouchableHighlight
        style={[styles.controllButton, {backgroundColor: 'lightblue'}]}
        onPress={() => {}}
        disabled={wordIndex === wordsLength - 1}>
        <FontAwesomeIcon icon="forward" size={20} />
      </TouchableHighlight>
      <View
        style={[
          styles.lessonStateIndicator,
          {backgroundColor: COLORS[lessonState]},
        ]}>
        <FontAwesomeIcon icon={ICONS[lessonState]} size={32} color="white" />
      </View>
      <TouchableHighlight
        style={[styles.controllButton, {backgroundColor: 'lightblue'}]}
        onPress={() => {}}>
        <FontAwesomeIcon icon="pause" size={20}/>
      </TouchableHighlight>
    </View>
  );
}

export default observer(ControlBar);
