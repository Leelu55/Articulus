import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import sharedStyles from '../styles/wordStyle';

import UIStore from '../stores/UIStore';

import {observer} from 'mobx-react';

function DebugLessonState() {
  const uiStore = useContext(UIStore);

  return (
    <View style={sharedStyles.viewHorizontal}>
      <Text>{uiStore.lessonState}</Text>
    </View>
  );
}
export default observer(DebugLessonState);
