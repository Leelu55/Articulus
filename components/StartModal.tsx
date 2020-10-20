/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import sharedStyles from '../styles/wordStyle';
import UIStore, {LessonState} from '../stores/UIStore';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
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
});
function StartModal({
  isModalVisible,
  setIsModalVisible,
  onStartLesson,
  onContinueLesson,
}: {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  onStartLesson: Function;
  onContinueLesson: Function;
}) {
  const uiStore = useContext(UIStore);

  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <View style={styles.wrapper}>
        <View style={styles.modalView}>
          <Pressable
            style={[sharedStyles.bigButton]}
            onPress={() => {
              onStartLesson();
              setIsModalVisible(false);
            }}>
            <Text style={sharedStyles.bigButtonText}>Start</Text>
          </Pressable>
          {![LessonState.IsInitial, LessonState.IsFinished].includes(
            uiStore.lessonState,
          ) && (
            <Pressable
              style={[
                sharedStyles.bigButton,
                {marginTop: 0, backgroundColor: '#00bfff'},
              ]}
              onPress={() => {
                onContinueLesson();
              }}>
              <Text style={sharedStyles.bigButtonText}>Continue</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
}

export default StartModal;
