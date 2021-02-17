import React from 'react';
import {Pressable, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pressable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
function PlayerOverlay({onPress}: {onPress: () => void}) {
  return <Pressable style={styles.pressable} onPress={onPress} />;
}
export default PlayerOverlay;
