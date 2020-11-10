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
  const icon = lessonState === LessonState.IsPaused ? 'play' : 'pause';
  const isFinished = uiStore.lessonState === LessonState.IsFinished;

  return (
    <Pressable
      style={[
        sharedStyles.controlButton,
        {
          backgroundColor: isFinished ? 'lightgrey' : 'black',
        },
      ]}
      onPress={() => {
        if (lessonState !== LessonState.IsPaused) {
          uiStore.setLessonState(LessonState.IsPaused);
        } else if (lessonState === LessonState.IsPaused) {
          uiStore.setLessonState(LessonState.IsSpeaking);
        }
      }}
      disabled={lessonState === LessonState.IsFinished}>
      <View>
        <FontAwesomeIcon icon={icon} size={20} color="white" />
      </View>
    </Pressable>
  );
}

export default observer(PausePlayButton);
