/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SuccessIcon from './SuccessIcon';
import {observer} from 'mobx-react';
import WordsStore from '../stores/WordsStore';
import {useContext} from 'react';
import BigButton from './BigButton';

function EmptyWordsScreen({navigation}) {
  const wordsStore = useContext(WordsStore);
  const nextLearningDay = wordsStore.words.reduce(function (prev, curr) {
    return prev.dueDateTime < curr.dueDateTime ? prev : curr;
  }).dueDateTime;

  const onContinueLesson = () => {
    navigation.navigate('StartScreen');
  };
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 30,
      marginBottom: 10,
      textAlign: 'center',
      marginTop: 30,
    },
    descriptionText: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      marginBottom: 100,
    },
  });
  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleText}>Heute alles geschafft!</Text>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <SuccessIcon />
      </View>
      <BigButton onPress={onContinueLesson} text="ZURÜCK" />
      <Text style={styles.descriptionText}>
        Komm
        {nextLearningDay
          ? nextLearningDay.toDateString() + 'am'
          : ' ' + 'heute' + ' '}
        wieder!
      </Text>
    </View>
  );
}

export default observer(EmptyWordsScreen);
