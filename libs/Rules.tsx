import React, {ReactElement} from 'react';
import {Text, StyleSheet} from 'react-native';
import settings from './settings.json';

interface RuleType {
  label: ReactElement;
  text: ReactElement;
  examples: ReactElement;
}
interface RulesType {
  [key: string]: RuleType;
}

const styles = StyleSheet.create({
  textHighlight: {
    color: settings.colors.primary.dark,
    fontWeight: 'bold',
  },
});

export const rules: RulesType = {
  FAQ_RULES_MONTH: {
    label: <Text>Monat : DER</Text>,
    text: <Text>Monatsnamen sind immer männlich.</Text>,
    examples: (
      <Text>
        <Text style={styles.textHighlight}>Januar</Text>,{' '}
        <Text style={styles.textHighlight}>Februar</Text>,{' '}
        <Text style={styles.textHighlight}>März</Text>
      </Text>
    ),
  },
  FAQ_RULES_SEASON: {
    label: <Text>Jahreszeit : DER</Text>,
    text: <Text>Jahreszeiten sind immer männlich.</Text>,
    examples: (
      <Text>
        <Text style={styles.textHighlight}>Frühling</Text>,{' '}
        <Text style={styles.textHighlight}>Sommer</Text>,{' '}
        <Text style={styles.textHighlight}>Herbst</Text>,{' '}
        <Text style={styles.textHighlight}>Winter</Text>
      </Text>
    ),
  },
  FAQ_RULES_UNG: {
    label: <Text>-ung : DIE</Text>,
    text: (
      <Text>
        Wörter mit der Endung <Text style={styles.textHighlight}>-ung </Text>
        sind meistens weiblich
      </Text>
    ),
    examples: (
      <Text>
        Entschuldig<Text style={styles.textHighlight}>ung</Text>, Berechtig
        <Text style={styles.textHighlight}>ung</Text>, Verzeih
        <Text style={styles.textHighlight}>ung</Text>
      </Text>
    ),
  },
  FAQ_RULES_IN: {
    label: <Text>-in : DIE</Text>,
    text: (
      <Text>
        Wörter mit der Endung <Text style={styles.textHighlight}>-in </Text>
        sind meistens weiblich
      </Text>
    ),
    examples: (
      <Text>
        Freund<Text style={styles.textHighlight}>in</Text>, Ärzt
        <Text style={styles.textHighlight}>in</Text>, Frisör
        <Text style={styles.textHighlight}>in</Text>
      </Text>
    ),
  },
  FAQ_RULES_IK: {
    label: <Text>-ik : DIE</Text>,
    text: (
      <Text>
        Wörter mit der Endung <Text style={styles.textHighlight}>-ik </Text>
        sind meistens weiblich
      </Text>
    ),
    examples: (
      <Text>
        Polit<Text style={styles.textHighlight}>ik</Text>, Mus
        <Text style={styles.textHighlight}>ik</Text>, Techn
        <Text style={styles.textHighlight}>ik</Text>
      </Text>
    ),
  },

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
