import React, {useContext} from 'react';
import {TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/fontawesome-free-solid';
import audioVoice from '../libs/audioVoice';
import UIStore, {LessonState} from '../stores/UIStore';

fontawesome.library.add(faTimes);
import {useNavigation} from '@react-navigation/native';

export function CancelButton() {
  const navigation = useNavigation();
  const uiStore = useContext(UIStore);

  return (
    <TouchableHighlight
      style={[styles.cancelButton]}
      onPress={() => {
        uiStore.setLessonState(LessonState.IsInitial);
        audioVoice.cleanup();
        navigation.goBack();
      }}>
      <FontAwesomeIcon icon="times" color="lightgrey" size={40} />
    </TouchableHighlight>
  );
}
