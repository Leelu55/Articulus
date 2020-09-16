import React, {useContext} from 'react';
import {TouchableHighlight, View} from 'react-native';
import styles from '../styles/wordStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';

function PausePlayButton() {
  const uiStore = useContext(UIStore);
  const lessonState = uiStore.lessonState;
  const icon = lessonState === LessonState.IsPaused ? 'play' : 'pause';

  return (
    <TouchableHighlight
      style={styles.controlButton}
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
    </TouchableHighlight>
  );
}

export default observer(PausePlayButton);
