/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View} from 'react-native';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import UIStore, {LessonState} from '../stores/UIStore';
import styles from '../styles/wordStyle';

function ProgressBar() {
  const wordIndex = useContext(UIStore).wordIndex;
  //const wordsLength = useContext(WordsStore).words.length;
  const lessonWords = useContext(WordsStore).lessonWords;
  const uiStore = useContext(UIStore);

  return (
    <View style={styles.progressBar}>
      {lessonWords.map(function (lessonWord, index) {
        const wordWithinRange =
          index < wordIndex || uiStore.lessonState === LessonState.IsFinished;
        const correctAnswer = lessonWord.answerArticle === lessonWord.article;
        let bgColor = 'lightgrey';

        if (wordWithinRange) {
          bgColor = correctAnswer ? 'yellowgreen' : 'tomato';
        }

        let borderTopLeftRadius = 0;
        let borderBottomLeftRadius = 0;
        let borderTopRightRadius = 0;
        let borderBottomRightRadius = 0;

        if (index === 0) {
          borderTopLeftRadius = 10;
          borderBottomLeftRadius = 10;
        }
        if (index === lessonWords.length - 1) {
          borderTopRightRadius = 10;
          borderBottomRightRadius = 10;
        }

        return (
          <View
            key={lessonWord.value}
            style={{
              flex: 1,
              backgroundColor: bgColor,
              borderBottomLeftRadius,
              borderTopLeftRadius,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderColor: 'black',
              height: 20,
              marginRight: 0.3,
            }}
          />
        );
      })}
    </View>
  );
}
export default observer(ProgressBar);
