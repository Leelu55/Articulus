/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import sharedStyles from '../styles/wordStyle';
import SuccessIcon from './SuccessIcon';
import {observer} from 'mobx-react';
import {NavigationStackProp} from 'react-navigation-stack';

function EmptyWordsScreen({navigation}: {navigation: NavigationStackProp}) {
  const onContinueLesson = () => {
    navigation.navigate('StartScreen');
  };

  const styles = StyleSheet.create({
    emptyWordsScreen: {
      backgroundColor: 'lightyellow',
      flexDirection: 'column',
      flex: 1,
    },
  });
  return (
    <View style={styles.emptyWordsScreen}>
      <SuccessIcon />
      <View style={[sharedStyles.viewVertical, {padding: 0, margin: 0}]}>
        <TouchableHighlight
          style={[
            sharedStyles.startScreenButton,
            {backgroundColor: 'darkblue'},
          ]}
          onPress={onContinueLesson}>
          <Text style={[sharedStyles.startScreenButtonText, {color: 'white'}]}>
            Zurück auf Start
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default observer(EmptyWordsScreen);
