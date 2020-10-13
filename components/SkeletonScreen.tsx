import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  skeletonScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

function SkeletonScreen({text}: {text: string}) {
  return (
    <View style={styles.skeletonScreen}>
      <Text style={styles.skeletonText}>{text}</Text>
    </View>
  );
}

export default SkeletonScreen;
