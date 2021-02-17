/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import styles from '../styles/sharedStyles';
import ProgressBar from './ProgressBar';
import {CancelButton} from './CancelButton';
import ForwardButton from './ForwardButton';

export function Header({
  doAnimate,
  chosenArticle,
  isHidden,
}: {
  doAnimate?: boolean;
  chosenArticle: string;
  isHidden: boolean;
}) {
  return (
    <View
      style={[
        styles.viewHorizontal,
        {alignItems: 'center', opacity: isHidden ? 0 : 1},
      ]}>
      <CancelButton />
      <ProgressBar doAnimate={doAnimate} chosenArticle={chosenArticle} />
      <ForwardButton />
    </View>
  );
}
