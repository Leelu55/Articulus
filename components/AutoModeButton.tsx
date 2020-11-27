import React, {useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import {observer} from 'mobx-react';
import UIStore, {LessonState} from '../stores/UIStore';
import {useContext} from 'react';
import * as audioVoice from '../libs/audioVoice';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHandSparkles} from '@fortawesome/free-solid-svg-icons';

export function AutoModeButton() {
  const uiStore = useContext(UIStore);
  const [isFrozen, setIsFrozen] = useState(false);
  let timeout = null;

  useEffect(() => {
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [timeout]);

  const styles = StyleSheet.create({
    wrapper: {
      borderRadius: 1000,
      overflow: 'hidden',
      backgroundColor: uiStore.autoMode ? 'black' : 'lightgrey',
    },
  });

  function onPress() {
    // prevent mismatch of autoMode and UI state
    setIsFrozen(true);
    timeout = setTimeout(() => setIsFrozen(false), 500);
    if (
      !uiStore.autoMode &&
      uiStore.lessonState === LessonState.IsWaitingForUserAction
    ) {
      audioVoice.voiceStart();
      uiStore.toggleAutoMode();
      return;
    }
    if (uiStore.lessonState === LessonState.IsListening) {
      if (uiStore.autoMode) {
        uiStore.setLessonState(LessonState.IsWaitingForUserAction);
        audioVoice.voiceStop();
      }
      uiStore.toggleAutoMode();
      return;
    }
    uiStore.toggleAutoMode();
  }
  const isDisabled = uiStore.lessonState === LessonState.IsFinished || isFrozen;

  return (
    <Pressable
      style={[sharedStyles.controlButton, styles.wrapper]}
      onPress={onPress}
      disabled={isDisabled}>
      <FontAwesomeIcon icon={faHandSparkles} size={35} color="white" />
    </Pressable>
  );
}

export default observer(AutoModeButton);
