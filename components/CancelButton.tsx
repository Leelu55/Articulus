import React from 'react';
import {TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/fontawesome-free-solid';

import {useNavigation} from '@react-navigation/native';

export function CancelButton() {
  const navigation = useNavigation();

  //const uiStore = useContext(UIStore);
  fontawesome.library.add(faTimes);
  return (
    <TouchableHighlight
      style={[styles.cancelButton]}
      onPress={() => {
        navigation.goBack();
      }}>
      <FontAwesomeIcon icon="times" color="white" />
    </TouchableHighlight>
  );
}
