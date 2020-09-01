import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import styles from '../styles/wordStyle';
import UIStore from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';

function ControlBar() {
  const wordIndex = useContext(UIStore).wordIndex;
  const wordsLength = useContext(WordsStore).words.length;

  return (
    <View style={styles.viewHorizontal}>
      <Button
        title="forward"
        onPress={() => {}}
        disabled={wordIndex === wordsLength - 1}
      />
      <View>
        <Text>Status</Text>
      </View>
      <Button title="pause" onPress={() => {}} />
    </View>
  );
}

export default observer(ControlBar);
