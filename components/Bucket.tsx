/* eslint-disable react-native/no-inline-styles */
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import sharedStyles from '../styles/wordStyle';
import {useWindowDimensions} from 'react-native';
import WordsStore from '../stores/WordsStore';
import {useContext} from 'react';

import {observer} from 'mobx-react';

function Bucket({slot}: {slot: number}) {
  const windowWidth = useWindowDimensions().width;
  const wordsStore = useContext(WordsStore);

  const styles = StyleSheet.create({
    Bucket: {
      margin: 5,
      borderRadius: 10,
      justifyContent: 'center',
      alignContent: 'center',
      flexWrap: 'wrap',
      flexDirection: 'row',
      backgroundColor: 'lightgrey',
      borderWidth: 0,
    },
    BucketIcon: {
      color: 'green',
      margin: 6,
    },
    BucketText: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  });

  const bucketSpace =
    (windowWidth - sharedStyles.viewHorizontal.margin * 2) / 5;
  const bucketOuterSpace = bucketSpace - styles.Bucket.margin * 2;
  const bucketInnerSpace = bucketOuterSpace - styles.Bucket.borderWidth * 2;
  const starWidth = bucketInnerSpace / 2 - styles.BucketIcon.margin * 2;

  var stars = [];
  for (var i = 0; i < Math.min(slot, 4); i++) {
    stars.push(
      <FontAwesomeIcon
        icon="star"
        size={starWidth}
        style={styles.BucketIcon}
        key={i}
      />,
    );
  }
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Text style={styles.BucketText}>{wordsStore.wordsForSlot(slot)}</Text>
      <View
        style={[
          styles.Bucket,
          {
            width: bucketOuterSpace,
            height: bucketOuterSpace,
          },
        ]}>
        {stars}
        {slot === 5 && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              icon="star"
              size={starWidth}
              style={styles.BucketIcon}
              key={slot}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default observer(Bucket);
