/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import WordsStore from '../stores/WordsStore';
import {useContext} from 'react';
import {observer} from 'mobx-react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import sharedStyles from '../styles/sharedStyles';
import settings from '../libs/settings.json';

function SavedLessons() {
  const wordsStore = useContext(WordsStore);
  const [openedIndex, setOpenedIndex] = useState(-1);

  return (
    <View style={styles.wrapper}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <Text style={sharedStyles.label}>LEKTIONEN</Text>
      </View>
      {wordsStore.savedLessons
        .filter((lesson) => lesson.isFinished)
        .map((savedLesson, index) => {
          const styleBorderRadius =
            openedIndex === index
              ? {borderTopLeftRadius: 10, borderTopRightRadius: 10}
              : {borderRadius: 10};
          return (
            <Pressable
              style={[styles.lesson]}
              key={index}
              onPress={() => {
                setOpenedIndex(openedIndex === index ? -1 : index);
              }}>
              <View
                style={[
                  sharedStyles.viewHorizontal,
                  styles.label,
                  styleBorderRadius,
                ]}>
                <Text style={styles.labelText}>
                  {savedLesson.date.toString().substr(0, 10)}
                </Text>
                <View style={styles.lessonCounts}>
                  <FontAwesomeIcon icon="check" color="green" size={20} />
                  <Text
                    style={[styles.correctAnswers, styles.lessonCountsText]}>
                    {savedLesson.countCorrectAnswers}
                  </Text>
                  <FontAwesomeIcon icon="times" color="red" size={20} />
                  <Text style={[styles.wrongAnswers, styles.lessonCountsText]}>
                    {savedLesson.countWrongAnswers}
                  </Text>
                </View>
              </View>

              {openedIndex === index && (
                <View style={styles.wordsList}>
                  {savedLesson.words.map((word, idx) => {
                    const styleBackground = {
                      backgroundColor: idx % 2 ? '#eee' : '#f5f5f5',
                    };
                    return (
                      <View
                        style={[styles.word, styleBackground]}
                        key={word.value}>
                        {word.isAnswerCorrect === true && (
                          <FontAwesomeIcon
                            icon="check"
                            color="green"
                            size={20}
                          />
                        )}
                        {word.isAnswerCorrect === false && (
                          <FontAwesomeIcon icon="times" color="red" size={20} />
                        )}
                        {word.isAnswerCorrect === null && (
                          <FontAwesomeIcon
                            icon="minus"
                            color="grey"
                            size={20}
                          />
                        )}
                        <Text style={styles.wordText}>{word.value}</Text>
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

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
  },
  label: {
    margin: 0,
    padding: 0,

    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 25,
    color: settings.colors.primary.dark,
    backgroundColor: '#ddd',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  labelText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
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
  word: {
    marginLeft: 5,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  wordText: {fontSize: 15, paddingLeft: 5},
  lessonCounts: {flexDirection: 'row', alignItems: 'center'},
  lessonCountsText: {fontSize: 20, fontWeight: 'bold'},
  correctAnswers: {color: 'green', marginLeft: 5, marginRight: 5},
  wrongAnswers: {color: 'red', marginLeft: 5, marginRight: 5},
});
export default observer(SavedLessons);
