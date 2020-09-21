import React, {useContext} from 'react';
import {TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/fontawesome-free-solid';
import audioVoice from '../libs/audioVoice';

fontawesome.library.add(faTimes);

import {useNavigation} from '@react-navigation/native';
import UIStore, {LessonState} from '../stores/UIStore';

export function CancelButton() {
  const uiStore = useContext(UIStore);
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      style={[styles.cancelButton]}
      onPress={() => {
        audioVoice.cleanup();
        navigation.goBack();
        uiStore.setLessonState(LessonState.IsFinished);
      }}>
      <FontAwesomeIcon icon="times" color="lightgrey" size={40} />
    </TouchableHighlight>
  );
}
