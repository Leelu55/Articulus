import React from 'react';
import {Image} from 'react-native';
import styles from '../styles/sharedStyles';

export function WordImage({imageUrl}) {
  return <Image style={styles.wordImage} source={{uri: imageUrl}} />;
}
