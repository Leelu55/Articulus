/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import sharedStyles from '../styles/wordStyle';
import WordsStore from '../stores/WordsStore';
import {useContext} from 'react';

import {observer} from 'mobx-react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const styles = StyleSheet.create({
  LearnedWordsView: {
    justifyContent: 'center',
    backgroundColor: 'yellow',
    marginLeft: 20,
    marginRight: 20,
  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  WordsLearnedText: {
    color: 'red',
  },
});

function LearnedWordsView() {
  const wordsStore = useContext(WordsStore);
  return (
    <View>
      <View style={[sharedStyles.viewHorizontal, styles.LearnedWordsView]}>
        <View style={{alignSelf: 'flex-start', backgroundColor: 'yellow'}}>
          <FontAwesomeIcon icon="star" size={50} color="red" />
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
            <Text>{wordsStore.wordsForSlot(5)}</Text>
          </View>
        </View>
        <Text style={styles.Text}> Artikel gelernt </Text>
      </View>
    </View>
  );
}

export default observer(LearnedWordsView);
