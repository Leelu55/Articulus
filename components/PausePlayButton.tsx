/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Pressable, View} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';

function PausePlayButton() {
  const uiStore = useContext(UIStore);
  const lessonState = uiStore.lessonState;
  const isFinished = uiStore.lessonState === LessonState.IsFinished;

  return (
    <Pressable
      style={[
        sharedStyles.controlButton,
        {
          backgroundColor: isFinished
            ? 'lightgrey'
            : lessonState === LessonState.IsPaused
            ? 'black'
            : 'lightgrey',
        },
      ]}
      onPress={() => {
        uiStore.setLessonState(LessonState.IsPaused);
      }}
      disabled={lessonState === LessonState.IsFinished}>
      <View>
        <FontAwesomeIcon icon={'pause'} size={20} color="white" />
      </View>
    </Pressable>
  );
}

export default observer(PausePlayButton);
