import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';

export function Selector() {
  return (
    <View style={styles.viewHorizontal}>
      <TouchableHighlight style={[styles.articleButton]} onPress={() => {}}>
        <Text style={styles.articleButtonText}>DER</Text>
      </TouchableHighlight>
      <TouchableHighlight style={[styles.articleButton]} onPress={() => {}}>
        <Text style={styles.articleButtonText}>DIE</Text>
      </TouchableHighlight>
      <TouchableHighlight style={[styles.articleButton]} onPress={() => {}}>
        <Text style={styles.articleButtonText}>DAS</Text>
      </TouchableHighlight>
    </View>
  );
}
