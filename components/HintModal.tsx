/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';

function doNothingFunction() {}

let _textTsx = null;
let _hintModalCloseHandler = doNothingFunction;

export function showHintModal(
  uiStore: any,
  textTsx: any,
  closeHandler?: Function,
) {
  _textTsx = textTsx;
  if (closeHandler) {
    _hintModalCloseHandler = () => {
      uiStore.setIsHintModalVisible(false);
      _textTsx = null;
      _hintModalCloseHandler = doNothingFunction;
      closeHandler();
    };
  }

  uiStore.setIsHintModalVisible(true);
}
function HintModal() {
  const uiStore = useContext(UIStore);

  return (
    <Modal
      style={{margin: 0}}
      isVisible={uiStore.isHintModalVisible}
      backdropTransitionOutTiming={0}
      customBackdrop={
        <TouchableWithoutFeedback onPress={() => _hintModalCloseHandler()}>
          <View style={{flex: 1, backgroundColor: 'black'}} />
        </TouchableWithoutFeedback>
      }
      onBackButtonPress={() => _hintModalCloseHandler()}>
      <View style={styles.wrapper}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{_textTsx}</Text>
          <Pressable onPress={() => _hintModalCloseHandler()}>
            <FontAwesomeIcon icon="times" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
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
  cancelButton: {},
});
export default observer(HintModal);
