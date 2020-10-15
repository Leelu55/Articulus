import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import sharedStyles from '../styles/wordStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {observer} from 'mobx-react';
import UIStore, {LessonState} from '../stores/UIStore';
import {useContext} from 'react';
import audioVoice from '../libs/audioVoice';
import {View} from 'react-native';

export function AutoModeButton() {
  const uiStore = useContext(UIStore);

  const styles = StyleSheet.create({
    wrapper: {
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: uiStore.autoMode ? '#00bfff' : 'lightgrey',
    },
    button: {
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
    },
  });
  function onPress() {
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
  const isDisabled = uiStore.lessonState === LessonState.IsFinished;

  return (
    <View style={styles.wrapper}>
      <Pressable
        // android_ripple={{color: 'aquamarin', borderless: true}}
        style={[sharedStyles.viewHorizontal, styles.button]}
        onPress={onPress}
        disabled={isDisabled}>
        <Text style={styles.text}>Autoplay</Text>
      </Pressable>
    </View>
  );
}

export default observer(AutoModeButton);
