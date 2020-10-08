/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import WordsStore from '../stores/WordsStore';
import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import {NavigationStackProp} from 'react-navigation-stack';
import BucketView from './BucketView';

function SecondStartScreen({navigation}: {navigation: NavigationStackProp}) {
  const wordsStore = useContext(WordsStore);
  const uiStore = useContext(UIStore);

  const onStartLesson = () => {
    wordsStore.emptyLesson();
    if (wordsStore.populateLesson()) {
      uiStore.setWordIndex(0);
      uiStore.setLessonState(LessonState.IsInitial);
      navigation.navigate('PlayerScreen');
    } else {
      navigation.navigate('EmptyWordsScreen');
    }
  };

  const onContinueLesson = () => {
    navigation.navigate('PlayerScreen');
  };

  return (
    <View style={styles.startScreen}>
      <View style={[styles.viewVertical, {padding: 0, margin: 0, flex: 1}]}>
        <BucketView />

        <TouchableHighlight
          style={[styles.startScreenButton, {backgroundColor: 'orange'}]}
          onPress={onStartLesson}>
          <Text style={[styles.startScreenButtonText, {color: 'white'}]}>
            Start neue Runde
          </Text>
        </TouchableHighlight>

        {![LessonState.IsInitial, LessonState.IsFinished].includes(
          uiStore.lessonState,
        ) && (
          <TouchableHighlight
            style={[styles.startScreenButton, {backgroundColor: 'lightgrey'}]}
            onPress={onContinueLesson}>
            <Text style={styles.startScreenButtonText}>Continue</Text>
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
}
export default observer(SecondStartScreen);
