/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable, Linking, StyleSheet, Image} from 'react-native';
import {observer} from 'mobx-react';
import {useState} from 'react';
import ttsLibrary from 'react-native-tts';
import sharedStyles from '../styles/sharedStyles';
import RNRestart from 'react-native-restart';
import ReloadWand from './SVGs/ReloadWand';
import settings from '../libs/settings.json';
import InstallNeeded from './SVGs/InstallNeeded';

function ConfigScreen({route}) {
  const {ttsError, voiceError} = route.params;
  const [isConfiguringTts, setIsConfiguringTts] = useState(false);
  const [isConfiguringVoice, setIsConfiguringVoice] = useState(false);

  const onConfigureTts = () => {
    ttsLibrary.requestInstallEngine();
    setTimeout(() => {
      setIsConfiguringTts(true);
    }, 1000);
  };

  const onConfigureVoice = () => {
    Linking.openURL(
      'market://details?id=com.google.android.googlequicksearchbox',
    );
    setTimeout(() => {
      setIsConfiguringVoice(true);
    }, 1000);
  };

  const onReload = () => {
    RNRestart.Restart();
  };

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 30,
      marginBottom: 10,
      textAlign: 'center',
      marginTop: 30,
    },
    subTitleText: {
      fontWeight: 'bold',
      fontSize: 25,
      textAlign: 'center',
      color: '#aaa',
    },
    descriptionText: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      marginBottom: 100,
    },
    bigButtonColor: {backgroundColor: settings.colors.secondary.normal},
    bigButtonTextColor: {color: 'black'},
    image: {flex: 1, width: 150, height: 150, resizeMode: 'contain'},
  });

  if (isConfiguringTts) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.titleText}>Geschafft!</Text>
        <Text style={styles.subTitleText}>Neustarten</Text>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ReloadWand />
        </View>
        <Pressable
          style={[sharedStyles.bigButton, styles.bigButtonColor]}
          onPress={onReload}>
          <Text style={[sharedStyles.bigButtonText, styles.bigButtonTextColor]}>
            Reload App
          </Text>
        </Pressable>
      </View>
    );
  }

  if (isConfiguringVoice) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.titleText}>Geschafft!</Text>
        <Text style={styles.subTitleText}>Neustarten</Text>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ReloadWand />
        </View>
        <Pressable
          style={[sharedStyles.bigButton, styles.bigButtonColor]}
          onPress={onReload}>
          <Text style={[sharedStyles.bigButtonText, styles.bigButtonTextColor]}>
            Reload App
          </Text>
        </Pressable>
      </View>
    );
  }

  if (ttsError) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.titleText}>
          Google Sprachausgabe ist nicht installiert
        </Text>
        <Text style={styles.subTitleText}>Notwendig für die Sprachausgabe</Text>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            height={50}
            width={50}
            source={require('../assets/google_tts_app_new.png')}
            style={styles.image}
          />
          <InstallNeeded />
        </View>
        <Pressable
          style={[sharedStyles.bigButton, styles.bigButtonColor]}
          onPress={onConfigureTts}>
          <Text style={[sharedStyles.bigButtonText, styles.bigButtonTextColor]}>
            Installieren
          </Text>
        </Pressable>
      </View>
    );
  }

  if (voiceError) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.titleText}>Google App ist nicht installiert</Text>
        <Text style={styles.subTitleText}>
          Notwendig für die Spracherkennung
        </Text>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            height={50}
            width={50}
            source={require('../assets/google_voice_app.png')}
            style={styles.image}
          />
          <InstallNeeded />
        </View>
        <Pressable
          style={[sharedStyles.bigButton, styles.bigButtonColor]}
          onPress={onConfigureVoice}>
          <Text style={[sharedStyles.bigButtonText, styles.bigButtonTextColor]}>
            Installieren
          </Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleText}>Hier ist etwas schief gegangen</Text>
      <Text style={styles.subTitleText}>Neustarten und Loslegen</Text>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ReloadWand />
      </View>
      <Pressable
        style={[sharedStyles.bigButton, styles.bigButtonColor]}
        onPress={onReload}>
        <Text style={[sharedStyles.bigButtonText, styles.bigButtonTextColor]}>
          Reload App
        </Text>
      </Pressable>
    </View>
  );
}

export default observer(ConfigScreen);
