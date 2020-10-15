import React from 'react';
import {View} from 'react-native';

import {observer} from 'mobx-react';

import '../styles/wordStyle';
import ControlBar from './ControlBar';
import {Header} from './Header';
import Word from './Word';
import styles from '../styles/wordStyle';
import SelectorButton from './SelectorButton';

function PlayerScreen() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <Header />
      <View style={[styles.viewHorizontal]}>
        <SelectorButton articleText="der" />
        <SelectorButton articleText="die" />
        <SelectorButton articleText="das" />
      </View>
      <Word />
      <ControlBar />
    </View>
  );
}

//extended component (observer with word)
export default observer(PlayerScreen);
