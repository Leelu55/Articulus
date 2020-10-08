/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import sharedStyles from '../styles/wordStyle';
import WordsStore from '../stores/WordsStore';
import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import {NavigationStackProp} from 'react-navigation-stack';
import BucketView from './BucketView';
import LearnedWordsView from './LearnedWordsView';

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
    <View style={sharedStyles.startScreen}>
      <View
        style={[sharedStyles.viewVertical, {padding: 0, margin: 0, flex: 1}]}>
        <View style={{flex: 1}}>
          <BucketView />
          <LearnedWordsView />
        </View>

        <TouchableHighlight
          style={[sharedStyles.startScreenButton, {backgroundColor: 'orange'}]}
          onPress={onStartLesson}>
          <Text style={[sharedStyles.startScreenButtonText, {color: 'white'}]}>
            Start neue Runde
          </Text>
        </TouchableHighlight>

        {![LessonState.IsInitial, LessonState.IsFinished].includes(
          uiStore.lessonState,
        ) && (
          <TouchableHighlight
            style={[
              sharedStyles.startScreenButton,
              {backgroundColor: 'lightgrey'},
            ]}
            onPress={onContinueLesson}>
            <Text style={sharedStyles.startScreenButtonText}>Continue</Text>
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
}
export default observer(SecondStartScreen);
