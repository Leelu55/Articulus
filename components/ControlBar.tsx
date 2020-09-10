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
import {LessonState} from '../stores/UIStore';

export const ICONS = {
  [LessonState.IsInitial]: 'assistive-listening-systems',
  [LessonState.IsListening]: 'assistive-listening-systems',
  [LessonState.IsSpeaking]: 'microphone-alt',
  [LessonState.IsEvaluating]: 'check-circle',
  [LessonState.IsPaused]: 'pause',
  [LessonState.IsFinished]: 'user-check',
};

export const COLORS = {
  [LessonState.IsInitial]: 'black',
  [LessonState.IsListening]: '#00bfff',
  [LessonState.IsSpeaking]: '#ffa500',
  [LessonState.IsEvaluating]: '#ffff00',
  [LessonState.IsPaused]: 'blue',
  [LessonState.IsFinished]: 'green',
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
