/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import sharedStyles from '../styles/sharedStyles';
import settings from '../libs/settings.json';

import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Modal from 'react-native-modal';
import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';

function doNothingFunction() {}

let _textTsx = null;
let _hintModalCloseHandler = doNothingFunction;

export function showHintModal(
  uiStore: any,
  textTsx: any,
  showHint: boolean,
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
  uiStore.setGrammarHintShown(true);
  uiStore.setIsHintModalVisible(showHint);
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
          <Pressable
            style={[
              sharedStyles.bigButton,
              {backgroundColor: settings.colors.secondary.normal},
            ]}
            onPress={() => _hintModalCloseHandler()}>
            <Text style={[sharedStyles.bigButtonText, {color: 'black'}]}>
              Alles klar!
            </Text>
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
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 0,
  },
  modalText: {
    marginBottom: 0,
  },
  cancelButton: {},
});
export default observer(HintModal);
