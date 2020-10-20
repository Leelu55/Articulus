/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React from 'react';
import {useContext} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import startLesson from '../libs/startLesson';
import UIStore, {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';

import sharedStyles from '../styles/sharedStyles';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    margin: 20,
    marginBottom: 0,
  },
});
function FinishedScreen() {
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.modalText}>Neu beginnen oder aufhören?</Text>
      <Text style={styles.modalText}>
        Richtig: {wordsStore.savedLessons.slice(-1)[0].countCorrectAnswers}
      </Text>
      <Text style={styles.modalText}>
        Falsch: {wordsStore.savedLessons.slice(-1)[0].countWrongAnswers}
      </Text>

      <Pressable
        style={[
          sharedStyles.bigButton,
          {marginBottom: 0, backgroundColor: '#00bfff'},
        ]}
        onPress={() => {
          uiStore.setLessonState(LessonState.IsInitial);
          // go back to start screen
          navigation.goBack();
          navigation.goBack();
        }}>
        <Text style={sharedStyles.bigButtonText}>Zurück</Text>
      </Pressable>

      <Pressable
        style={[sharedStyles.bigButton]}
        onPress={() => {
          startLesson(wordsStore, uiStore, navigation);
        }}>
        <Text style={sharedStyles.bigButtonText}>Neue Lektion</Text>
      </Pressable>
    </View>
  );
}

export default observer(FinishedScreen);
