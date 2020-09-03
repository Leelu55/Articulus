/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import UIStore from '../stores/UIStore';
import styles from '../styles/wordStyle';

function StartScreen() {
  const uiStore = useContext(UIStore);

  return (
    <View style={styles.startScreen}>
      <Title />
      <View style={styles.viewHorizontal}>
        <TouchableHighlight
          style={[styles.articleButton, {backgroundColor: 'red'}]}
          onPress={() => uiStore.setIsInitial(false)}>
          <Text style={styles.articleButtonText}>Start</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

function Title() {
  return (
    <View style={styles.viewHorizontal}>
      <Text style={[styles.appTitle, {color: 'green'}]}>der</Text>
      <Text style={[styles.appTitle, {color: 'orange'}]}>die</Text>
      <Text style={[styles.appTitle, {color: 'yellow'}]}>das</Text>
    </View>
  );
}
export default StartScreen;
