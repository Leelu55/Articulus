import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {hints} from '../libs/hints';
import settings from '../libs/settings.json';

function Hint({hintId}: {hintId: string}) {
  return (
    <View style={styles.wrapper} key={hintId}>
      <View style={styles.imagesWrapper}>{hints[hintId].icon}</View>
      <Text style={styles.ruleText}>{hints[hintId].text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {width: Dimensions.get('window').width},
  imagesWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  ruleText: {
    fontSize: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Hint;
