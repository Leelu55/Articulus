import React from 'react';
import {View, StyleSheet} from 'react-native';
import Triangle from 'react-native-triangle';
import settings from '../libs/settings.json';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    backgroundColor: settings.colors.secondary.normal,
    width: 300,
    padding: 10,
    marginBottom: 20,
  },
  triangleWrapper: {
    position: 'absolute',
    bottom: -30,
    right: 20,
    transform: [{rotate: '-20deg'}],
  },
});
function ChatBubble({children}: {children: React.ReactNode}) {
  return (
    <View style={styles.wrapper}>
      {children}

      <View style={styles.triangleWrapper}>
        <Triangle
          width={40}
          height={40}
          color={settings.colors.secondary.normal}
          direction={'down'}
        />
      </View>
    </View>
  );
}

export default ChatBubble;
