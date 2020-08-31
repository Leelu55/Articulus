import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import PlayerScreen from './PlayerScreen';
import StartScreen from './/StartScreen';
import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';

declare const global: {HermesInternal: null | {}};

const MainApp = () => {
  const uiStore = useContext(UIStore);
  const isInitial = uiStore.isInitial;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {isInitial && <StartScreen />}
          {!isInitial && <PlayerScreen />}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

export default observer(MainApp);
