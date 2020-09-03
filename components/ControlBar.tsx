/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import UIStore from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import {COLORS} from '../styles/colors';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAssistiveListeningSystems,
  faMicrophoneAlt,
  faUserCheck,
  faForward,
  faPause,
} from '@fortawesome/fontawesome-free-solid';

export const ICONS = {
  0: 'assistive-listening-systems',
  1: 'microphone-alt',
  2: 'user-check',
};

function ControlBar() {
  const wordIndex = useContext(UIStore).wordIndex;
  const wordsLength = useContext(WordsStore).words.length;
  const audioState: number = useContext(UIStore).audioState.valueOf();
  fontawesome.library.add(
    faAssistiveListeningSystems,
    faMicrophoneAlt,
    faUserCheck,
    faForward,
    faPause,
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
          styles.audioStateIndicator,
          {backgroundColor: COLORS[audioState]},
        ]}>
        <FontAwesomeIcon icon={ICONS[audioState]} size={32} />
      </View>
      <TouchableHighlight
        style={[styles.controllButton, {backgroundColor: 'lightblue'}]}
        onPress={() => {}}>
        <FontAwesomeIcon icon="pause" size={20} />
      </TouchableHighlight>
    </View>
  );
}

export default observer(ControlBar);
