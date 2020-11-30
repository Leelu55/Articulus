import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import settings from '../libs/settings.json';

function FaqItems() {
  return (
    <View>
      {Object.keys(rules).map((ruleId) => (
        <View style={styles.wrapper} key={ruleId}>
          <Text style={[sharedStyles.label, styles.label]}>
            {rules[ruleId].label}
          </Text>
          <Text style={styles.ruleText}>{rules[ruleId].text}</Text>
          <Text style={styles.exampleText}>{rules[ruleId].examples}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
  },
  textHighlight: {
    color: settings.colors.primary.dark,
    fontWeight: 'bold',
    backgroundColor: settings.colors.secondary.light,
  },
  ruleTitle: {fontSize: 20, marginBottom: 5},
  label: {
    marginBottom: 20,
  },
  ruleText: {},
  exampleText: {fontStyle: 'italic', marginTop: 5},
});

export const rules = {
  FAQ_RULES_SCHAFT: {
    label: <Text>-schaft : DIE</Text>,
    text: (
      <Text>
        Wörter mit der Endung <Text style={styles.textHighlight}>-schaft </Text>
        sind immer weiblich
      </Text>
    ),
    examples: (
      <Text>
        Gemein<Text style={styles.textHighlight}>schaft</Text>, Bürg
        <Text style={styles.textHighlight}>schaft</Text>, Freund
        <Text style={styles.textHighlight}>schaft</Text>
      </Text>
    ),
  },
  FAQ_RULES_HEIT: {
    label: <Text>-heit : DIE</Text>,
    text: (
      <Text>
        Wörter mit der Endung <Text style={styles.textHighlight}>-heit </Text>
        sind immer weiblich
      </Text>
    ),
    examples: (
      <Text>
        Gemein<Text style={styles.textHighlight}>heit</Text>, Krank
        <Text style={styles.textHighlight}>heit</Text>, Ein
        <Text style={styles.textHighlight}>heit</Text>
      </Text>
    ),
  },
};

export default FaqItems;
