import {observer} from 'mobx-react';
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import UIStore from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import styles from '../styles/wordStyle';

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
  const styleCorrect = {backgroundColor: 'yellowgreen', opacity: 1};
  const styleWrong = {backgroundColor: 'tomato', opacity: 1};

  const styleSelector = (article: string) =>
    chosenArticle(article) && isCorrectArticle
      ? styleCorrect
      : chosenArticle(article) && !isCorrectArticle
      ? styleWrong
      : styleDefault;

  return (
    <View style={styles.viewHorizontal}>
      <View style={[styles.articleButton, styleSelector('der')]}>
        <Text style={styles.articleButtonText}>DER</Text>
      </View>
      <View style={[styles.articleButton, styleSelector('die')]}>
        <Text style={styles.articleButtonText}>DIE</Text>
      </View>
      <View style={[styles.articleButton, styleSelector('das')]}>
        <Text style={styles.articleButtonText}>DAS</Text>
      </View>
    </View>
  );
}

export default observer(Selector);
