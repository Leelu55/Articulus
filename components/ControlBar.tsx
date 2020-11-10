import React from 'react';
import {View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import LessonStateIndicator from './LessonStateIndicator';
import PausePlayButton from './PausePlayButton';
import AutoModeButton from './AutoModeButton';
import sharedStyles from '../styles/sharedStyles';

const styles = StyleSheet.create({
  controlBar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});
function ControlBar() {
  return (
    <View>
      <View style={[sharedStyles.viewHorizontal, styles.controlBar]}>
        <PausePlayButton />
        <LessonStateIndicator />
        <AutoModeButton />
      </View>
    </View>
  );
}

export default observer(ControlBar);
