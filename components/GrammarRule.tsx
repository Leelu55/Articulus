import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {rules} from '../libs/rules';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSpellCheck} from '@fortawesome/free-solid-svg-icons';
import settings from '../libs/settings.json';

function GrammarRule({ruleId}: {ruleId: string}) {
  return (
    <View style={styles.wrapper} key={ruleId}>
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <FontAwesomeIcon
            icon={faSpellCheck}
            size={30}
            color={settings.colors.primary.dark}
          />
        </View>
        <Text style={styles.headerText}>Regel</Text>
      </View>

      <Text style={styles.ruleText}>{rules[ruleId].text}</Text>
      <Text style={styles.exampleText}>{rules[ruleId].examples}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {width: Dimensions.get('window').width, padding: 20},
  iconWrapper: {
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: settings.colors.secondary.normal,
  },
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 20},
  headerText: {fontSize: 30, fontWeight: 'bold', marginLeft: 10},

  label: {
    marginBottom: 20,
  },
  ruleText: {fontSize: 20},
  exampleText: {fontSize: 15, marginTop: 5, color: 'grey'},
});

export default GrammarRule;
