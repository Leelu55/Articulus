/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useRef} from 'react';
import {View, ActivityIndicator} from 'react-native';
import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';
import {useState} from 'react';
import settings from '../libs/settings.json';
import ttsLibrary, {Engine} from 'react-native-tts';
import voiceLibrary from '@react-native-community/voice';

function CheckAudioVoiceConfig({navigation}) {
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
    // use google.android.tts engine for tts and stt
    ttsLibrary.getInitStatus().then(
      () => {
        ttsLibrary.engines().then((engines: Engine[]) => {
          engines = engines.filter(
            (engine: Engine) => engine.name === 'com.google.android.tts',
          );
          //console.log({enginesLength: engines.length, engines});
          if (engines.length === 1) {
            ttsLibrary.setDefaultEngine('com.google.android.tts');
          }
          if (engines.length === 0) {
            errors.current.push('ttsError');
          }
          setIsTtsChecked(true);
        });
      },
      (err) => {
        if (err.code === 'no_engine') {
          errors.current.push('ttsError');
        }
      },
    );
    checkVoiceServices();
  }, []);

  useEffect(() => {
    if (isTtsChecked || isVoiceChecked) {
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
