/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import settings from '../libs/settings.json';
import Modal from 'react-native-modal';

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
    <Modal
      coverScreen={false}
      deviceHeight={Dimensions.get('screen').height}
      style={{margin: 0}}
      isVisible={isModalVisible}
      // https://github.com/react-native-modal/react-native-modal#the-modal-enterexit-animation-flickers
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onBackdropPress={() => setIsModalVisible(false)}
      onBackButtonPress={() => setIsModalVisible(false)}>
      <View style={styles.wrapper}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Unterbrochene Lektion fortsetzen oder neu beginnen?
          </Text>

          <Pressable
            style={[
              sharedStyles.bigButton,
              {
                marginBottom: 0,
                backgroundColor: settings.colors.secondary.normal,
              },
            ]}
            onPress={() => {
              onContinueLesson();
            }}>
            <Text style={[sharedStyles.bigButtonText, {color: 'black'}]}>
              Fortsetzen
            </Text>
          </Pressable>

          <Pressable
            style={[sharedStyles.bigButton]}
            onPress={() => {
              onStartLesson();
              setIsModalVisible(false);
            }}>
            <Text style={[sharedStyles.bigButtonText, {color: 'white'}]}>
              Neue Lektion
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default StartModal;
