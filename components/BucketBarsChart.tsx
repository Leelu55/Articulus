/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import settings from '../libs/settings.json';
import {observer} from 'mobx-react';
import BucketBar from './BucketBar';
import sharedStyles from '../styles/sharedStyles';
import WordsStore from '../stores/WordsStore';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    margin: 20,
  },
});
function BucketBarsChart() {
  const wordsStore = useContext(WordsStore);
  let maxWordsForSlots = 0;
  let bucketBars = [];

  for (let slot = 1; slot < settings.numberOfSlots; slot++) {
    const wordsForSlot = wordsStore.wordsForSlot(slot);
    maxWordsForSlots = Math.max(maxWordsForSlots, wordsForSlot);
  }
  for (let slot = 1; slot < settings.numberOfSlots; slot++) {
    bucketBars.push(
      <BucketBar slot={slot} key={slot} maxWordsForSlots={maxWordsForSlots} />,
    );
  }
  return (
    <View style={styles.wrapper}>
      <Text style={sharedStyles.label}>LERNKARTEN</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 20,
        }}>
        {bucketBars}
      </View>
    </View>
  );
}

export default observer(BucketBarsChart);
