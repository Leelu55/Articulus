/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {calcLearningProgressPercentage} from '../libs/utils';
import WordsStore from '../stores/WordsStore';
import {View, Text, StyleSheet} from 'react-native';
import settings from '../libs/settings.json';
import {observer} from 'mobx-react';
import sharedStyles from '../styles/sharedStyles';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    marginVertical: 20,
  },
  progressBar: {
    backgroundColor: 'lightgrey',
    marginTop: 5,
    borderRadius: 30,
    overflow: 'hidden',
  },
  fillPercentage: {
    backgroundColor: settings.colors.primary.dark,
    height: 30,
    borderRadius: 50,
    minWidth: 30,
  },
  percentText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
    color: settings.colors.primary.dark,
    marginLeft: 5,
  },
  labelText: {
    color: settings.colors.primary.dark,
    fontWeight: 'bold',
    padding: 5,
    fontSize: 15,
    backgroundColor: settings.colors.secondary.normal,
  },
});
function ProgressView() {
  const wordsStore = useContext(WordsStore);
  const learningProgressPercentage = calcLearningProgressPercentage(
    wordsStore.words,
  );

  return (
    <View style={styles.wrapper}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={sharedStyles.label}>LERNFORTSCHRITT</Text>
      </View>
      <Text style={styles.percentText}>{learningProgressPercentage}%</Text>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.fillPercentage,
            {width: learningProgressPercentage + '%'},
          ]}
        />
      </View>
    </View>
  );
}

export default observer(ProgressView);
//        <Text>Already learned {learningProgressPercentage}% of words</Text>
