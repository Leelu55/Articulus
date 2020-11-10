import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wordStyle: {
    fontSize: 80,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
});

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
