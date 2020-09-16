import React from 'react';
import {View} from 'react-native';
import styles from '../styles/wordStyle';
import {observer} from 'mobx-react';
import LessonStateIndicator from './LessonStateIndicator';
import ForwardButton from './ForwardButton';
import PausePlayButton from './PausePlayButton';

function ControlBar() {
  return (
    <View style={[styles.viewHorizontal, styles.controlBar]}>
      <PausePlayButton />
      <LessonStateIndicator />
      <ForwardButton />
    </View>
  );
}

export default observer(ControlBar);
