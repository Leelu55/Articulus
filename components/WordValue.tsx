import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/wordStyle';
export function WordValue({value}: {value: string}) {
  return (
    <View>
      {/* dynamic font size to prevent overflow */}
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.wordStyle}>
        {value}
      </Text>
    </View>
  );
}
