/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View} from 'react-native';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import UIStore, {LessonState} from '../stores/UIStore';

function ProgressBar() {
  const wordIndex = useContext(UIStore).wordIndex;
  //const wordsLength = useContext(WordsStore).words.length;
  const lessonWords = useContext(WordsStore).lessonWords;
  const uiStore = useContext(UIStore);

  return (
    <View style={{backgroundColor: 'blue', flex: 1, flexDirection: 'row'}}>
      {lessonWords.map(function (lessonWord, index) {
        const wordWithinRange =
          index < wordIndex || uiStore.lessonState === LessonState.IsFinished;
        const correctAnswer = lessonWord.answerArticle === lessonWord.article;
        let bgColor = 'white';

        if (wordWithinRange) {
          bgColor = correctAnswer ? 'green' : 'red';
        }

        return (
          <View
            key={lessonWord.value}
            style={{
              flex: 1,
              backgroundColor: bgColor,
              borderColor: 'black',
              borderWidth: 1,
            }}
          />
        );
      })}
    </View>
  );
}
export default observer(ProgressBar);
