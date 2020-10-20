import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import sharedStyles from '../styles/sharedStyles';

import UIStore from '../stores/UIStore';

import {observer} from 'mobx-react';

function DebugLessonState() {
  const uiStore = useContext(UIStore);

  return (
    <View style={[sharedStyles.viewHorizontal, styles.wrapper]}>
      <Text style={styles.text}>{uiStore.lessonState}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'yellow',
    padding: 20,
    margin: 0,
    justifyContent: 'center',
    borderTopWidth: 2,
    borderColor: 'orange',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default observer(DebugLessonState);
