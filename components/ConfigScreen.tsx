/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable, Linking} from 'react-native';
import {observer} from 'mobx-react';
import {useState} from 'react';
import ttsLibrary from 'react-native-tts';
import {NavigationRoute} from 'react-navigation';
import sharedStyles from '../styles/sharedStyles';
import RNRestart from 'react-native-restart';

function ConfigScreen({route}: {route: NavigationRoute}) {
  const {ttsError, voiceError} = route.params;
  const [isConfiguringTts, setIsConfiguringTts] = useState(false);
  const [isConfiguringVoice, setIsConfiguringVoice] = useState(false);

  console.error({routeParams: route.params});

  const onConfigureTts = () => {
    ttsLibrary.requestInstallEngine();
    setIsConfiguringTts(true);
  };

  const onConfigureVoice = () => {
    Linking.openURL(
      'market://details?id=com.google.android.googlequicksearchbox',
    );
    setIsConfiguringVoice(true);
  };

  const onReload = () => {
    RNRestart.Restart();
  };

  if (isConfiguringTts) {
    return (
      <View style={{flex: 1}}>
        <Text>After Configuring "TTS" you have to reload the App</Text>
        <Pressable style={sharedStyles.bigButton} onPress={onReload}>
          <Text style={sharedStyles.bigButtonText}>Reload App</Text>
        </Pressable>
      </View>
    );
  }

  if (isConfiguringVoice) {
    return (
      <View style={{flex: 1}}>
        <Text>After Configuring "Voice" you have to reload the App</Text>
        <Pressable style={sharedStyles.bigButton} onPress={onReload}>
          <Text style={sharedStyles.bigButtonText}>Reload App</Text>
        </Pressable>
      </View>
    );
  }

  if (ttsError) {
    return (
      <View style={{flex: 1}}>
        <Text>TTS is not configured</Text>
        <Pressable style={sharedStyles.bigButton} onPress={onConfigureTts}>
          <Text style={sharedStyles.bigButtonText}>Configure TTS</Text>
        </Pressable>
      </View>
    );
  }

  if (voiceError) {
    return (
      <View style={{flex: 1}}>
        <Text>Voice is not configured</Text>
        <Pressable style={sharedStyles.bigButton} onPress={onConfigureVoice}>
          <Text style={sharedStyles.bigButtonText}>Configure Voice</Text>
        </Pressable>
      </View>
    );
  }

  return <Text>EXCEPTION</Text>;
}

export default observer(ConfigScreen);
