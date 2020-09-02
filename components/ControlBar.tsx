/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import UIStore from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import {COLORS} from '../styles/colors';

function ControlBar() {
  const wordIndex = useContext(UIStore).wordIndex;
  const wordsLength = useContext(WordsStore).words.length;
  const audioState: number = useContext(UIStore).audioState.valueOf();
  console.log(audioState);

  return (
    <View style={styles.viewHorizontal}>
      <TouchableHighlight
        style={[styles.controllButton, {backgroundColor: 'lightblue'}]}
        onPress={() => {}}
        disabled={wordIndex === wordsLength - 1}>
        <Text style={styles.controllButtonText}>forward</Text>
      </TouchableHighlight>
      <View
        style={[styles.controllButton, {backgroundColor: COLORS[audioState]}]}>
        <Text style={styles.audioStateIndicatorText}>{audioState}</Text>
      </View>
      <TouchableHighlight
        style={[styles.controllButton, {backgroundColor: 'lightblue'}]}
        onPress={() => {}}>
        <Text style={styles.controllButtonText}>pause</Text>
      </TouchableHighlight>
    </View>
  );
}

export default observer(ControlBar);
