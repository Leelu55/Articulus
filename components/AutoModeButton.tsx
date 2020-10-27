import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import {observer} from 'mobx-react';
import UIStore, {LessonState} from '../stores/UIStore';
import {useContext} from 'react';
import audioVoice from '../libs/audioVoice';
import {View} from 'react-native';
import {useState} from 'react';

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
