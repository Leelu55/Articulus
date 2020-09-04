import React, {useContext} from 'react';
import {TouchableHighlight} from 'react-native';
import UIStore from '../stores/UIStore';
import styles from '../styles/wordStyle';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {faTimes} from '@fortawesome/fontawesome-free-solid';

export function CancelButton({navigation}) {
  //const uiStore = useContext(UIStore);
  fontawesome.library.add(faTimes);
  return (
    <TouchableHighlight
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.cancelButton]}
      onPress={() => {
        navigation.popToTop();
      }}>
      <FontAwesomeIcon icon="times" color="white" />
    </TouchableHighlight>
  );
}
