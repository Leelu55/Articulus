import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {rules} from '../libs/Rules';
import settings from '../libs/settings.json';

function GrammarItem({ruleId}: {ruleId: string}) {
  return (
    <View style={styles.wrapper} key={ruleId}>
      <Text style={styles.label}>{rules[ruleId].label}</Text>
      <Text style={styles.ruleText}>{rules[ruleId].text}</Text>
      <Text style={styles.ruleExamples}>{rules[ruleId].examples}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#eee',
    borderRadius: 30,
  },
  label: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 20,
    color: settings.colors.primary.dark,
    backgroundColor: 'lightgrey',
    fontWeight: 'bold',
  },
  ruleText: {fontSize: 20, paddingHorizontal: 20},
  ruleExamples: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
    color: 'grey',
  },
});

export default GrammarItem;
