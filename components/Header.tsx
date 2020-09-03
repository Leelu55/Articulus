import React from 'react';
import {View} from 'react-native';
import styles from '../styles/wordStyle';
import ProgressBar from './ProgressBar';
import {CancelButton} from './CancelButton';

export function Header() {
  return (
    <View style={styles.viewHorizontal}>
      <CancelButton />
      <ProgressBar />
    </View>
  );
}
