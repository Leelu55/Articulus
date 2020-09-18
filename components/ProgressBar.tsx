/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View} from 'react-native';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import UIStore, {LessonState} from '../stores/UIStore';
import styles from '../styles/wordStyle';
import settings from '../libs/settings.json';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

function ProgressBar() {
  const wordIndex = useContext(UIStore).wordIndex;
  //const wordsLength = useContext(WordsStore).words.length;
  const lessonWords = useContext(WordsStore).lessonWords;
  const uiStore = useContext(UIStore);

  return (
    <View style={styles.progressBar}>
      {lessonWords.map(function (lessonWord, index) {
        const wordWithinRange =
          index <= wordIndex || uiStore.lessonState === LessonState.IsFinished;
        const correctAnswer = lessonWord.answerArticle === lessonWord.article;
        let bgColor = 'lightgrey';

        if (wordWithinRange && lessonWord.answerArticle !== null) {
          bgColor = correctAnswer
            ? settings.colors.correctAnswer
            : settings.colors.wrongAnswer;
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
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {index === wordIndex &&
              uiStore.lessonState !== LessonState.IsFinished && (
                <FontAwesomeIcon
                  icon="circle"
                  size={5}
                  color="black"
                  style={{opacity: 0.75}}
                />
              )}
            {lessonWords[index].answerArticle === null &&
              (index < wordIndex ||
                uiStore.lessonState === LessonState.IsFinished) && (
                <FontAwesomeIcon
                  icon="minus"
                  size={10}
                  color="black"
                  style={{opacity: 0.6}}
                />
              )}
          </View>
        );
      })}
    </View>
  );
}
export default observer(ProgressBar);
