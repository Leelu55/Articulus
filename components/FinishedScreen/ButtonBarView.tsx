/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Animated, Pressable, StyleSheet, Text} from 'react-native';
import startLesson from '../../libs/startLesson';
import {LessonState} from '../../stores/UIStore';
import sharedStyles from '../../styles/sharedStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ButtonBar from '../ButtonBar';
import {AnimatedValue} from 'react-navigation';

export default function ButtonBarView({
  uiStore,
  navigation,
  wordsStore,
  animButtonBarView,
}: {
  uiStore;
  navigation;
  wordsStore;
  animButtonBarView: AnimatedValue;
}) {
  return (
    <Animated.View
      style={{
        flexDirection: 'column',

        opacity: animButtonBarView.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1],
        }),
      }}>
      <Text style={styles.modalText}>Neu beginnen oder aufhören?</Text>
      <ButtonBar>
        <Pressable
          style={[
            sharedStyles.bigButton,
            {
              backgroundColor: 'lightgrey',
              margin: 0,
              marginRight: 20,
              width: 80,
            },
          ]}
          onPress={() => {
            uiStore.setLessonState(LessonState.IsInitial);
            // go back to start screen
            navigation.goBack();
            navigation.goBack();
          }}>
          <FontAwesomeIcon icon="home" size={30} color="grey" />
        </Pressable>
        <Pressable
          style={[
            sharedStyles.bigButton,
            {margin: 0, flexDirection: 'row', flex: 1},
          ]}
          onPress={() => {
            startLesson(wordsStore, uiStore, navigation);
          }}>
          <Text style={sharedStyles.bigButtonText}>Nächste</Text>
          <FontAwesomeIcon icon="arrow-right" size={30} color="white" />
        </Pressable>
      </ButtonBar>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  modalText: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 0,
  },
});
