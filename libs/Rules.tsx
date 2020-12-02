import React, {ReactElement} from 'react';
import {Text, StyleSheet} from 'react-native';
import settings from './settings.json';

interface RuleType {
  category: string;
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
  FAQ_RULES_WEEKDAY: {
    category: 'DER',
    label: <Text>Wochentag</Text>,
    text: <Text>Wochentage sind immer männlich.</Text>,
    examples: (
      <Text>
        der<Text style={styles.textHighlight}> Montag</Text>, der
        <Text style={styles.textHighlight}> Dienstag</Text>, der
        <Text style={styles.textHighlight}> Mittwoch</Text>
      </Text>
    ),
  },
  FAQ_RULES_MONTH: {
    category: 'DER',
    label: <Text>Monat</Text>,
    text: <Text>Monatsnamen sind immer männlich.</Text>,
    examples: (
      <Text>
        der<Text style={styles.textHighlight}> Januar</Text>, der
        <Text style={styles.textHighlight}> Februar</Text>, der
        <Text style={styles.textHighlight}> März</Text>
      </Text>
    ),
  },
  FAQ_RULES_SEASON: {
    category: 'DER',
    label: <Text>Jahreszeit</Text>,
    text: <Text>Jahreszeiten sind immer männlich.</Text>,
    examples: (
      <Text>
        der<Text style={styles.textHighlight}> Frühling</Text>, der
        <Text style={styles.textHighlight}> Sommer</Text>, der
        <Text style={styles.textHighlight}> Herbst</Text>, der
        <Text style={styles.textHighlight}> Winter</Text>
      </Text>
    ),
  },
  FAQ_RULES_UNG: {
    category: 'DIE',
    label: <Text>-ung</Text>,
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
    category: 'DIE',
    label: <Text>-in</Text>,
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
    category: 'DIE',
    label: <Text>-ik</Text>,
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
    category: 'DIE',
    label: <Text>-schaft</Text>,
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
    category: 'DIE',
    label: <Text>-heit</Text>,
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
  FAQ_RULES_DIMINUTIV: {
    category: 'DAS',
    label: <Text>-chen, -lein</Text>,
    text: (
      <Text>
        Diminutive (Verniedlichungen und Verkleinerungen) mit den Endungen
        <Text style={styles.textHighlight}>-chen </Text> und{' '}
        <Text style={styles.textHighlight}>-lein </Text>
        sind immer sächlich (Neutrum).
      </Text>
    ),
    examples: (
      <Text>
        Kanin<Text style={styles.textHighlight}>chen</Text>, Schätz
        <Text style={styles.textHighlight}>chen</Text>, Fräu
        <Text style={styles.textHighlight}>lein</Text>
      </Text>
    ),
  },
  FAQ_RULES_NIS: {
    category: 'DAS',
    label: <Text>-nis</Text>,
    text: (
      <Text>
        Die meisten Wörter mit der Endung{' '}
        <Text style={styles.textHighlight}>-nis </Text>
        sind sächlich (Neutrum)
      </Text>
    ),
    examples: (
      <Text>
        Zeug<Text style={styles.textHighlight}>nis</Text>, Ergeb
        <Text style={styles.textHighlight}>nis</Text>, Ereig
        <Text style={styles.textHighlight}>nis</Text>
      </Text>
    ),
  },
};
