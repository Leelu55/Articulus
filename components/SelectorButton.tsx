import {observer} from 'mobx-react';
import React, {useContext} from 'react';
import {Text, TouchableHighlight} from 'react-native';
import UIStore, {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import styles from '../styles/sharedStyles';
import settings from '../libs/settings.json';
import processAnswer from '../libs/processAnswer';
import audioVoice from '../libs/audioVoice';

function SelectorButton({articleText}: {articleText: string}) {
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  const wordIndex = uiStore.wordIndex;
  const currentLessonWord = wordsStore.lessonWords[wordIndex];

  const isCorrectArticle =
    currentLessonWord.answerArticle === currentLessonWord.article;

  const chosenArticle = () =>
    currentLessonWord.answerArticle === articleText ? true : false;

  const styleDefault = {opacity: 0.5};
  const styleCorrect = {
    backgroundColor: settings.colors.correctAnswer,
    opacity: 1,
  };
  const styleWrong = {backgroundColor: settings.colors.wrongAnswer, opacity: 1};

  const styleSelector = () =>
    chosenArticle() && isCorrectArticle
      ? styleCorrect
      : chosenArticle() && !isCorrectArticle
      ? styleWrong
      : styleDefault;
  return (
    <TouchableHighlight
      disabled={[
        LessonState.IsEvaluating,
        LessonState.IsPaused,
        LessonState.IsFinished,
      ].includes(uiStore.lessonState)}
      style={[styles.articleButton, styleSelector()]}
      onPress={() => {
        audioVoice.voiceStop();
        audioVoice.stopSpeakWord();
        processAnswer(wordsStore, uiStore, articleText);
      }}>
      <Text style={styles.articleButtonText}>{articleText.toUpperCase()}</Text>
    </TouchableHighlight>
  );
}

export default observer(SelectorButton);
