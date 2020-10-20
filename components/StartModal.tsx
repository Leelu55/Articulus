/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import sharedStyles from '../styles/sharedStyles';

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
  modalText: {
    fontSize: 20,
    margin: 20,
    marginBottom: 0,
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
  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <View style={styles.wrapper}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Unterbrochene Lektion fortsetzen oder neu beginnen?
          </Text>

          <Pressable
            style={[
              sharedStyles.bigButton,
              {marginBottom: 0, backgroundColor: '#00bfff'},
            ]}
            onPress={() => {
              onContinueLesson();
            }}>
            <Text style={sharedStyles.bigButtonText}>Fortsetzen</Text>
          </Pressable>

          <Pressable
            style={[sharedStyles.bigButton]}
            onPress={() => {
              onStartLesson();
              setIsModalVisible(false);
            }}>
            <Text style={sharedStyles.bigButtonText}>Neue Lektion</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default StartModal;
