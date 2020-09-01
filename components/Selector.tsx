import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';

export function Selector() {
  return (
    <View style={styles.viewHorizontal}>
      <TouchableHighlight
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.articleButton, {backgroundColor: 'green'}]}
        onPress={() => {}}>
        <Text style={styles.articleButtonText}>DER</Text>
      </TouchableHighlight>
      <TouchableHighlight
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.articleButton, {backgroundColor: 'yellow'}]}
        onPress={() => {}}>
        <Text style={styles.articleButtonText}>DIE</Text>
      </TouchableHighlight>
      <TouchableHighlight
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.articleButton, {backgroundColor: 'orange'}]}
        onPress={() => {}}>
        <Text style={styles.articleButtonText}>DAS</Text>
      </TouchableHighlight>
    </View>
  );
}
