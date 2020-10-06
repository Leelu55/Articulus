import {observer} from 'mobx-react';
import React, {useContext} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import UIStore, { LessonState } from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import styles from '../styles/wordStyle';
import settings from '../libs/settings.json';
import processAnswer from '../libs/processAnswer';
import audioVoice from '../libs/audioVoice';

function Selector() {
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  const wordIndex = uiStore.wordIndex;
  const currentLessonWord = wordsStore.lessonWords[wordIndex];

  const isCorrectArticle =
    currentLessonWord.answerArticle === currentLessonWord.article;

  const chosenArticle = (article) =>
    currentLessonWord.answerArticle === article ? true : false;

  const styleDefault = {opacity: 0.5};
  const styleCorrect = {
    backgroundColor: settings.colors.correctAnswer,
    opacity: 1,
  };
  const styleWrong = {backgroundColor: settings.colors.wrongAnswer, opacity: 1};

  const styleSelector = (article: string) =>
    chosenArticle(article) && isCorrectArticle
      ? styleCorrect
      : chosenArticle(article) && !isCorrectArticle
      ? styleWrong
      : styleDefault;

  return (
    <View style={styles.viewHorizontal}>
      <TouchableHighlight
        disabled={uiStore.lessonState === LessonState.IsEvaluating}
        style={[styles.articleButton, styleSelector('der')]}
        onPress={() => {
          audioVoice.voiceStop();
          audioVoice.stopSpeakWord();
          processAnswer(wordsStore, uiStore, 'der');
        }}>
        <Text style={styles.articleButtonText}>DER</Text>
      </TouchableHighlight>

      <TouchableHighlight
        disabled={uiStore.lessonState === LessonState.IsEvaluating}
        style={[styles.articleButton, styleSelector('die')]}
        onPress={() => {
          audioVoice.voiceStop();
          audioVoice.stopSpeakWord();
          processAnswer(wordsStore, uiStore, 'die');
        }}>
        <Text style={styles.articleButtonText}>DIE</Text>
      </TouchableHighlight>

      <TouchableHighlight
        disabled={uiStore.lessonState === LessonState.IsEvaluating}
        style={[styles.articleButton, styleSelector('das')]}
        onPress={() => {
          audioVoice.voiceStop();
          audioVoice.stopSpeakWord();
          processAnswer(wordsStore, uiStore, 'das');
        }}>
        <Text style={styles.articleButtonText}>DAS</Text>
      </TouchableHighlight>
    </View>
  );
}

export default observer(Selector);
