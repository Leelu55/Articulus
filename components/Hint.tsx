import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {hints} from '../libs/Hints';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSpellCheck} from '@fortawesome/free-solid-svg-icons';
import settings from '../libs/settings.json';

function Hint({hintId}: {hintId: string}) {
  return (
    <View style={styles.wrapper} key={hintId}>
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

      <Text style={styles.ruleText}>{hints[hintId].text}</Text>
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
  ruleText: {fontSize: 20},
});

export default Hint;
