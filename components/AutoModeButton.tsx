/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import {observer} from 'mobx-react';
import UIStore, {LessonState} from '../stores/UIStore';
import {useContext} from 'react';
import * as audioVoice from '../libs/audioVoice';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHandSparkles} from '@fortawesome/free-solid-svg-icons';
import settings from '../libs/settings.json';
import HintBubble from './HintBubble';

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
    <View>
      <View
        style={{
          overflow: 'hidden',
          borderRadius: sharedStyles.controlButton.borderRadius,
        }}>
        <Pressable
          style={[sharedStyles.controlButton, styles.wrapper]}
          onPress={onPress}
          android_ripple={{color: settings.colors.ripple}}
          disabled={isDisabled}>
          <FontAwesomeIcon icon={faHandSparkles} size={35} color="white" />
        </Pressable>
      </View>
      <HintBubble
        hintText="Sprechen an/aus"
        position="topRight"
        offsetX={28}
        offsetY={45}
        delay={500}
      />
    </View>
  );
}

export default observer(AutoModeButton);
