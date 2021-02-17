/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import settings from '../libs/settings.json';
import Modal from 'react-native-modal';
import BigButton from './BigButton';

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

          <BigButton
            style={{
              marginBottom: 0,
              backgroundColor: settings.colors.secondary.normal,
            }}
            textStyle={{color: 'black'}}
            onPress={() => {
              setTimeout(onContinueLesson, 0);
            }}
            text="FORTSETZEN"
          />

          <BigButton
            onPress={() => {
              setTimeout(() => {
                onStartLesson();
                setIsModalVisible(false);
              }, 0);
            }}
            textStyle={{color: 'white'}}
            text="NEUE LEKTION"
          />
        </View>
      </View>
    </Modal>
  );
}

export default StartModal;
