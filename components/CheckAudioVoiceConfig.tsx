/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useRef} from 'react';
import {View, ActivityIndicator} from 'react-native';
import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';
import {NavigationStackProp} from 'react-navigation-stack';
import {useState} from 'react';
import settings from '../libs/settings.json';
import ttsLibrary from 'react-native-tts';
import voiceLibrary from '@react-native-community/voice';

function CheckAudioVoiceConfig({
  navigation,
}: {
  navigation: NavigationStackProp;
}) {
  const uiStore = useContext(UIStore);
  const [isTtsChecked, setIsTtsChecked] = useState(false);
  const [isVoiceChecked, setIsVoiceChecked] = useState(false);
  const errors = useRef([]);

  async function checkVoiceServices() {
    const services = await voiceLibrary.getSpeechRecognitionServices();
    if (
      services &&
      !services.includes('com.google.android.googlequicksearchbox')
    ) {
      errors.current.push('voiceError');
    }
    setIsVoiceChecked(true);
  }

  useEffect(() => {
    ttsLibrary.getInitStatus().then(
      () => {
        setIsTtsChecked(true);
      },
      (err) => {
        if (err.code === 'no_engine') {
          errors.current.push('ttsError');
        }
        setIsTtsChecked(true);
      },
    );
    checkVoiceServices();
  }, []);

  useEffect(() => {
    if (isTtsChecked && isVoiceChecked) {
      if (errors.current.length) {
        navigation.navigate('ConfigScreen', {
          ttsError: errors.current.includes('ttsError'),
          voiceError: errors.current.includes('voiceError'),
        });
      } else {
        uiStore.hideConfig();
      }
    }
  }, [isTtsChecked, isVoiceChecked, navigation, uiStore]);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator
        animating={true}
        color={settings.colors.primary.normal}
        size={100}
      />
    </View>
  );
}

export default observer(CheckAudioVoiceConfig);
/* uiStore.hideConfig();
navigation.navigate('ConfigScreen');
 */
