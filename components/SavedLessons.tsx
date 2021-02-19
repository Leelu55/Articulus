/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import WordsStore from '../stores/WordsStore';
import {useContext} from 'react';
import {observer} from 'mobx-react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import sharedStyles from '../styles/sharedStyles';
import settings from '../libs/settings.json';

function SavedLessons() {
  const wordsStore = useContext(WordsStore);
  const [openedIndex, setOpenedIndex] = useState(-1);
  const windowWidth = useWindowDimensions().width;

  return (
    <View style={styles.wrapper}>
      <Text style={sharedStyles.label}>LEKTIONEN</Text>
      {wordsStore.savedLessons
        .filter((lesson) => lesson.isFinished)
        .map((savedLesson, index) => {
          const styleBorderRadius =
            openedIndex === index
              ? {borderTopLeftRadius: 10, borderTopRightRadius: 10}
              : {borderRadius: 10};
          return (
            <Pressable
              style={styles.lesson}
              key={index}
              onPress={() => {
                setOpenedIndex(openedIndex === index ? -1 : index);
              }}>
              <View style={[styles.label, styleBorderRadius]}>
                <View style={styles.lessonCounts}>
                  <View style={styles.lessonCountsIconWrapper}>
                    <FontAwesomeIcon icon="check" color="green" size={20} />
                  </View>
                  <Text
                    style={[styles.correctAnswers, styles.lessonCountsText]}>
                    {savedLesson.countCorrectAnswers}
                  </Text>
                  <View style={styles.lessonCountsIconWrapper}>
                    <FontAwesomeIcon icon="times" color="red" size={20} />
                  </View>
                  <Text style={[styles.wrongAnswers, styles.lessonCountsText]}>
                    {savedLesson.countWrongAnswers}
                  </Text>
                </View>
                <Text style={styles.dateText}>
                  {savedLesson.date.toString().substr(0, 10)}
                </Text>
              </View>

              {openedIndex === index && (
                <View style={styles.wordsList}>
                  {savedLesson.words.map((word, idx) => {
                    return (
                      <View style={styles.wordWrapper} key={idx}>
                        <ArticleButton word={word} article="der" />
                        <ArticleButton word={word} article="die" />
                        <ArticleButton word={word} article="das" />
                        <Text
                          style={[styles.wordText, {width: windowWidth / 3}]}
                          adjustsFontSizeToFit
                          numberOfLines={1}>
                          {word.value}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </Pressable>
          );
        })}
    </View>
  );
}

const ArticleButton = ({word, article}: {word: any; article: string}) => {
  return (
    <View
      style={[
        styles.articleButton,
        {
          backgroundColor:
            word.answerArticle === article
              ? word.isAnswerCorrect
                ? 'green'
                : 'red'
              : 'lightgrey',
        },
      ]}>
      <Text
        style={[
          styles.articleButtonText,
          {
            color: word.answerArticle === article ? 'white' : 'black',
          },
        ]}>
        der
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
  },
  label: {
    paddingVertical: 10,
    fontSize: 25,
    color: settings.colors.primary.dark,
    backgroundColor: '#e5e5e5',
    fontWeight: 'bold',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  dateText: {
    flex: 1,
    fontSize: 20,
    color: 'grey',
    textAlign: 'right',
  },
  lesson: {
    backgroundColor: '#eee',
    flexDirection: 'column',
    borderRadius: 10,
    marginBottom: 10,
  },
  wordsList: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    paddingBottom: 20,
  },

  wordText: {fontSize: 20},
  lessonCountsIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 30,
  },
  lessonCounts: {flexDirection: 'row', alignItems: 'center'},
  lessonCountsText: {fontSize: 20, fontWeight: 'bold', marginRight: 10},
  correctAnswers: {color: 'green', marginLeft: 5, marginRight: 5},
  wrongAnswers: {color: 'red', marginLeft: 5, marginRight: 5},
  wordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  articleButton: {
    backgroundColor: 'lightgrey',
    marginRight: 10,
    padding: 5,
    borderRadius: 50,
    marginVertical: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
  },
  articleButtonText: {fontSize: 12, textAlign: 'center'},
});
export default observer(SavedLessons);
