/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import UIStore from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {LessonState} from '../stores/UIStore';

export const ICONS = {
  [LessonState.IsInitial]: 'assistive-listening-systems',
  [LessonState.IsListening]: 'microphone',
  [LessonState.IsSpeaking]: 'volume-down',
  [LessonState.IsEvaluating]: 'check-circle',
  [LessonState.IsPaused]: 'pause',
  [LessonState.IsFinished]: 'flag-checkered',
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


  return (
    <View style={[styles.viewHorizontal, styles.controlBar]}>
      <TouchableHighlight
        style={styles.controlButton}
        onPress={() => {}}
        disabled={wordIndex === wordsLength - 1}>
        <FontAwesomeIcon icon="forward" size={20} color="white" />
      </TouchableHighlight>
      <View
        style={[
          styles.lessonStateIndicator,
          {backgroundColor: COLORS[lessonState]},
        ]}>
        <FontAwesomeIcon icon={ICONS[lessonState]} size={60} color="white" />
      </View>
      <TouchableHighlight style={styles.controlButton} onPress={() => {}}>
        <FontAwesomeIcon icon="pause" size={20} color="white" />
      </TouchableHighlight>
    </View>
  );
}

export default observer(ControlBar);
