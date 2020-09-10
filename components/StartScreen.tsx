/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import WordsStore from '../stores/WordsStore';
import UIStore, {LessonState} from '../stores/UIStore';

function StartScreen({navigation}) {
  const wordsStore = useContext(WordsStore);
  const uiStore = useContext(UIStore);

  const onStartLesson = () => {
    navigation.navigate('PlayerScreen');
    if (
      uiStore.lessonState === LessonState.IsFinished ||
      uiStore.lessonState === LessonState.IsInitial
    ) {
      wordsStore.emptyLesson();
      wordsStore.populateLesson();
    }
  };

  return (
    <View style={styles.startScreen}>
      <Title />
      <View style={styles.viewHorizontal}>
        <TouchableHighlight
          style={[styles.articleButton, {backgroundColor: 'red'}]}
          onPress={onStartLesson}>
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
