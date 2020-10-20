import React from 'react';
import {View} from 'react-native';
import styles from '../styles/sharedStyles';
import {observer} from 'mobx-react';
import LessonStateIndicator from './LessonStateIndicator';
import ForwardButton from './ForwardButton';
import PausePlayButton from './PausePlayButton';
import AutoModeButton from './AutoModeButton';

function ControlBar() {
  return (
    <View>
      <View style={[styles.viewHorizontal, styles.controlBar]}>
        <PausePlayButton />
        <LessonStateIndicator />
        <ForwardButton />
      </View>
      <View style={[styles.viewHorizontal, styles.controlBar]}>
        <AutoModeButton />
      </View>
    </View>
  );
}

export default observer(ControlBar);
