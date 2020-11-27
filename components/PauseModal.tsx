/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import settings from '../libs/settings.json';
import Modal from 'react-native-modal';
import UnicornCat from './SVGs/UnicornCat';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    flexDirection: 'row',
    backgroundColor: settings.colors.primary.background,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    margin: 20,
    flex: 1,
  },
});
function PauseModal({
  isModalVisible,
  setIsModalVisible,
}: {
  isModalVisible: boolean;
  setIsModalVisible: Function;
}) {
  return (
    <Modal
      style={{margin: 0}}
      isVisible={isModalVisible}
      // https://github.com/react-native-modal/react-native-modal#the-modal-enterexit-animation-flickers
      backdropTransitionOutTiming={0}
      customBackdrop={
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={{flex: 1, backgroundColor: 'black'}} />
        </TouchableWithoutFeedback>
      }
      onBackButtonPress={() => setIsModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
        <View style={styles.wrapper}>
          <View style={styles.modalView}>
            <UnicornCat width={100} height={100} />
            <Text style={styles.modalText}>
              Drücke irgendwo um weiterzumachen.
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default PauseModal;
