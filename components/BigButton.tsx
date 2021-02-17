import React, {ReactNode} from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import settings from '../libs/settings.json';

export default function BigButton({
  text,
  onPress,
  style,
  textStyle,
}: {
  text: string | ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}) {
  return (
    <View style={[styles.BigButton, style]}>
      <Pressable
        android_ripple={{color: settings.colors.primary.superlight}}
        style={styles.BigButtonPressable}
        onPress={() => {
          //setTimeout(onPress, 0);
          onPress();
        }}>
        <Text style={[styles.BigButtonText, textStyle]}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  BigButton: {
    margin: 20,
    backgroundColor: settings.colors.primary.normal,
    borderRadius: 10,
    overflow: 'hidden',
  },
  BigButtonPressable: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },

  BigButtonText: {
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    fontSize: 30,
  },
});
