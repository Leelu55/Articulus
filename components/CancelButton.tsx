import React from 'react';
import {TouchableHighlight} from 'react-native';
import styles from '../styles/sharedStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';

export function CancelButton() {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      style={[styles.cancelButton]}
      onPress={() => {
        navigation.goBack();
      }}>
      <FontAwesomeIcon icon="times" color="lightgrey" size={40} />
    </TouchableHighlight>
  );
}
