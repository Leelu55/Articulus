import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/wordStyle';
export function WordValue({value}: {value: string}) {
  return (
    <View>
      <Text style={styles.wordStyle}>{value}</Text>
    </View>
  );
}
