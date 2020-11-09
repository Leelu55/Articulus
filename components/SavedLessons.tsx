/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import WordsStore from '../stores/WordsStore';
import {useContext} from 'react';
import {observer} from 'mobx-react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import sharedStyles from '../styles/sharedStyles';

function SavedLessons() {
  const wordsStore = useContext(WordsStore);
  const [openedIndex, setOpenedIndex] = useState(-1);

  return (
    <View style={styles.wrapper}>
      {wordsStore.savedLessons
        .filter((lesson) => lesson.isFinished)
        .map((savedLesson, index) => (
          <Pressable
            style={styles.lesson}
            key={index}
            onPress={() => {
              setOpenedIndex(openedIndex === index ? -1 : index);
            }}>
            <View style={sharedStyles.viewHorizontal}>
              <Text style={{flex: 1}}>
                {savedLesson.date.toString().substr(0, 10)}
              </Text>
              <View style={styles.lessonCounts}>
                <FontAwesomeIcon icon="check" color="green" size={20} />
                <Text style={styles.correctAnswers}>
                  {savedLesson.countCorrectAnswers}
                </Text>
                <FontAwesomeIcon icon="times" color="red" size={20} />
                <Text style={styles.wrongAnswers}>
                  {savedLesson.countWrongAnswers}
                </Text>
              </View>
            </View>

            {openedIndex === index && (
              <View style={styles.wordsList}>
                {savedLesson.words.map((word) => {
                  return (
                    <View style={styles.word} key={word.value}>
                      {word.isAnswerCorrect === true && (
                        <FontAwesomeIcon icon="check" color="green" size={20} />
                      )}
                      {word.isAnswerCorrect === false && (
                        <FontAwesomeIcon icon="times" color="red" size={20} />
                      )}
                      {word.isAnswerCorrect === null && (
                        <FontAwesomeIcon icon="minus" color="grey" size={20} />
                      )}
                      <Text style={styles.wordText}>{word.value}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </Pressable>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {borderColor: 'orange', borderWidth: 1, margin: 10},
  lesson: {
    padding: 10,
    borderBottomColor: 'orange',
    borderBottomWidth: 1,
    flexDirection: 'column',
  },
  wordsList: {marginTop: 10, backgroundColor: 'lightgrey'},
  word: {marginLeft: 5, alignItems: 'center', flexDirection: 'row'},
  wordText: {fontSize: 15, paddingLeft: 5},
  lessonCounts: {flexDirection: 'row'},
  correctAnswers: {color: 'green', marginLeft: 5, marginRight: 5},
  wrongAnswers: {color: 'red', marginLeft: 5, marginRight: 5},
});
export default observer(SavedLessons);
