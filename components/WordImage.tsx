import React from 'react';
import {Image} from 'react-native';
import styles from '../styles/wordStyle';

export function WordImage({imageUrl}) {
  return <Image style={styles.wordImage} source={{uri: imageUrl}} />;
}
