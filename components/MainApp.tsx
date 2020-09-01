import React, {useContext} from 'react';
import {View} from 'react-native';

import PlayerScreen from './PlayerScreen';
import StartScreen from './/StartScreen';
import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';

const MainApp = () => {
  const uiStore = useContext(UIStore);
  const isInitial = uiStore.isInitial;

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      {isInitial && <StartScreen />}
      {!isInitial && <PlayerScreen />}
    </View>
  );
};

export default observer(MainApp);
