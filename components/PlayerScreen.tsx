import React from 'react';
import {View} from 'react-native';

import {observer} from 'mobx-react';

import '../styles/wordStyle';

import Selector from './Selector';
import ControlBar from './ControlBar';
import {Header} from './Header';
import Word from './Word';

function PlayerScreen() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <Header />
      <Selector />
      <Word />
      <ControlBar />
    </View>
  );
}

//extended component (observer with word)
export default observer(PlayerScreen);
