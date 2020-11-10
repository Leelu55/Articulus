/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import styles from '../styles/sharedStyles';
import ProgressBar from './ProgressBar';
import {CancelButton} from './CancelButton';
import ForwardButton from './ForwardButton';

export function Header() {
  return (
    <View style={[styles.viewHorizontal, {alignItems: 'center'}]}>
      <CancelButton />
      <ProgressBar />
      <ForwardButton />
    </View>
  );
}
