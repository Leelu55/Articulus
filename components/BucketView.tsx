import React from 'react';
import {StyleSheet, View} from 'react-native';
import sharedStyles from '../styles/wordStyle';
import Bucket from './Bucket';
import settings from '../libs/settings.json';

const styles = StyleSheet.create({
  BucketView: {
    justifyContent: 'space-evenly',
  },
});
function BucketView() {
  var buckets = [];
  for (var i = 1; i < settings.numberOfSlots; i++) {
    buckets.push(<Bucket slot={i} key={i} />);
  }
  return (
    <View style={[sharedStyles.viewHorizontal, styles.BucketView]}>
      {buckets}
    </View>
  );
}

export default BucketView;
