import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import {rules} from '../libs/Rules';

function GrammarItem({ruleId}: {ruleId: string}) {
  return (
    <View style={styles.wrapper} key={ruleId}>
      <Text style={[sharedStyles.label, styles.label]}>
        {rules[ruleId].label}
      </Text>
      <Text style={styles.ruleText}>{rules[ruleId].text}</Text>
      <Text style={styles.ruleExamples}>{rules[ruleId].examples}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
  },
  label: {
    marginBottom: 20,
    fontSize: 20,
  },
  ruleText: {fontSize: 20},
  ruleExamples: {
    fontSize: 15,
    marginTop: 5,
    color: 'grey',
  },
});

export default GrammarItem;
