/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef} from 'react';
import {View, Text, TouchableHighlight, Animated, Pressable} from 'react-native';
import styles from '../styles/wordStyle';
import {NavigationStackProp} from 'react-navigation-stack';

function EmptyWordsScreen({navigation}: {navigation: NavigationStackProp}) {
  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.startScreen}>
      <Pressable onPress={onBack}>
        <Text>Go Back</Text>
      </Pressable>
    </View>
  );
}

export default EmptyWordsScreen;
