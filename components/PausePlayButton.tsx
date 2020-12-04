/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Pressable, View} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import settings from '../libs/settings.json';

function PausePlayButton() {
  const uiStore = useContext(UIStore);
  const lessonState = uiStore.lessonState;
  const isFinished = uiStore.lessonState === LessonState.IsFinished;

  return (
    <View
      style={{
        overflow: 'hidden',
        borderRadius: sharedStyles.controlButton.borderRadius,
      }}>
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
        android_ripple={{color: settings.colors.ripple}}
        onPress={() => {
          uiStore.setLessonState(LessonState.IsPaused);
        }}
        disabled={lessonState === LessonState.IsFinished}>
        <FontAwesomeIcon icon={'pause'} size={20} color="white" />
      </Pressable>
    </View>
  );
}

export default observer(PausePlayButton);
