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
        Nomen mit der Endung <Text style={styles.textHighlight}> -ung </Text>
        sind meistens weiblich
      </Text>
    ),
    examples: (
      <Text>
        die Entschuldig<Text style={styles.textHighlight}>ung</Text>, die
        Berechtig
        <Text style={styles.textHighlight}>ung</Text>, die Verzeih
        <Text style={styles.textHighlight}>ung</Text>
      </Text>
    ),
  },
  FAQ_RULES_IN: {
    category: 'DIE',
    label: <Text>-in</Text>,
    text: (
      <Text>
        Nomen für weibliche Personen mit der Endung
        <Text style={styles.textHighlight}> -in </Text>
        sind weiblich
      </Text>
    ),
    examples: (
      <Text>
        die Freund<Text style={styles.textHighlight}>in</Text>, die Ärzt
        <Text style={styles.textHighlight}>in</Text>, die Frisör
        <Text style={styles.textHighlight}>in</Text>
      </Text>
    ),
  },
  FAQ_RULES_IK: {
    category: 'DIE',
    label: <Text>-ik</Text>,
    text: (
      <Text>
        Nomen mit der Endung <Text style={styles.textHighlight}> -ik </Text>
        sind meistens weiblich
      </Text>
    ),
    examples: (
      <Text>
        die Polit<Text style={styles.textHighlight}>ik</Text>, die Mus
        <Text style={styles.textHighlight}>ik</Text>, die Techn
        <Text style={styles.textHighlight}>ik</Text>
      </Text>
    ),
  },

  FAQ_RULES_SCHAFT: {
    category: 'DIE',
    label: <Text>-schaft</Text>,
    text: (
      <Text>
        Nomen mit der Endung <Text style={styles.textHighlight}> -schaft </Text>
        sind immer weiblich
      </Text>
    ),
    examples: (
      <Text>
        die Gemein<Text style={styles.textHighlight}>schaft</Text>, die Bürg
        <Text style={styles.textHighlight}>schaft</Text>, die Freund
        <Text style={styles.textHighlight}>schaft</Text>
      </Text>
    ),
  },
  FAQ_RULES_HEIT_KEIT: {
    category: 'DIE',
    label: <Text>-heit, -keit</Text>,
    text: (
      <Text>
        Nomen mit den Endungen
        <Text style={styles.textHighlight}> -heit und -keit </Text>
        sind immer weiblich
      </Text>
    ),
    examples: (
      <Text>
        die Gemein<Text style={styles.textHighlight}>heit</Text>, die Krank
        <Text style={styles.textHighlight}>heit</Text>, die Ein
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
        <Text style={styles.textHighlight}> -chen </Text> und
        <Text style={styles.textHighlight}> -lein </Text>
        sind immer sächlich (Neutrum).
      </Text>
    ),
    examples: (
      <Text>
        das Kanin<Text style={styles.textHighlight}>chen</Text>, das Schätz
        <Text style={styles.textHighlight}>chen</Text>, das Fräu
        <Text style={styles.textHighlight}>lein</Text>
      </Text>
    ),
  },
  FAQ_RULES_NIS: {
    category: 'DAS',
    label: <Text>-nis</Text>,
    text: (
      <Text>
        Die meisten Nomen mit der Endung
        <Text style={styles.textHighlight}> -nis </Text>
        sind sächlich (Neutrum)
      </Text>
    ),
    examples: (
      <Text>
        das Zeug<Text style={styles.textHighlight}>nis</Text>, das Ergeb
        <Text style={styles.textHighlight}>nis</Text>, das Ereig
        <Text style={styles.textHighlight}>nis</Text>
      </Text>
    ),
  },
  FAQ_RULES_UNFT: {
    category: 'DIE',
    label: <Text>-unft</Text>,
    text: (
      <Text>
        Die meisten Nomen mit der Endung
        <Text style={styles.textHighlight}> -unft </Text>
        sind weiblich (Femininum)
      </Text>
    ),
    examples: (
      <Text>
        die Vern<Text style={styles.textHighlight}>unft</Text>, die Unterk
        <Text style={styles.textHighlight}>unft</Text>
      </Text>
    ),
  },
  FAQ_RULES_COMPASS_DIRECTION: {
    category: 'DER',
    label: <Text>Himmelsrichtung</Text>,
    text: <Text>Himmelsrichtungen sind immer männlich.</Text>,
    examples: (
      <Text>
        der<Text style={styles.textHighlight}> Osten</Text>, der
        <Text style={styles.textHighlight}> Norden</Text>, der
        <Text style={styles.textHighlight}> Süden</Text>, der
        <Text style={styles.textHighlight}> Westen</Text>
      </Text>
    ),
  },
  FAQ_RULES_DAYTIME: {
    category: 'DER',
    label: <Text>Tageszeiten</Text>,
    text: <Text>Tageszeiten sind meistens männlich.</Text>,
    examples: (
      <Text>
        der<Text style={styles.textHighlight}> Morgen</Text>, der
        <Text style={styles.textHighlight}> Abend</Text>, der
        <Text style={styles.textHighlight}> Nachmittag</Text>, der
        <Text style={styles.textHighlight}> Mittag</Text>
      </Text>
    ),
  },
  FAQ_RULES_PRECIPITATION: {
    category: 'DER',
    label: <Text>Niederschlag bei Wetterbeschreibung</Text>,
    text: (
      <Text>
        Nomen für Niederschlag bei Wetterbeschreibung sind meist männlich
        (Maskulinum).
      </Text>
    ),
    examples: (
      <Text>
        der<Text style={styles.textHighlight}> Regen</Text>, der
        <Text style={styles.textHighlight}> Schnee</Text>, der
        <Text style={styles.textHighlight}> Nebel</Text>, der
      </Text>
    ),
  },
  FAQ_RULES_EI: {
    category: 'DIE',
    label: <Text>-ei</Text>,
    text: (
      <Text>
        Die meisten Nomen mit der Endung
        <Text style={styles.textHighlight}> -ei </Text>
        sind meist weiblich (Femininum)
      </Text>
    ),
    examples: (
      <Text>
        die Bäcker<Text style={styles.textHighlight}>ei</Text>, die Poliz
        <Text style={styles.textHighlight}>ei</Text>
      </Text>
    ),
  },
  FAQ_RULES_E: {
    category: 'DIE',
    label: <Text>-e</Text>,
    text: (
      <Text>
        Sehr viele Nomen mit der Endung
        <Text style={styles.textHighlight}> -e </Text>
        sind weiblich (Femininum)
      </Text>
    ),
    examples: (
      <Text>
        die Eck<Text style={styles.textHighlight}>e</Text>, die Banan
        <Text style={styles.textHighlight}>e</Text>
      </Text>
    ),
  },
  FAQ_RULES_ION: {
    category: 'DIE',
    label: <Text>-ion</Text>,
    text: (
      <Text>
        Die meisten Nomen mit der Endung
        <Text style={styles.textHighlight}> -ion </Text>
        sind weiblich (Femininum)
      </Text>
    ),
    examples: (
      <Text>
        die Informat<Text style={styles.textHighlight}>ion</Text>, die Rezept
        <Text style={styles.textHighlight}>ion</Text>
      </Text>
    ),
  },
  FAQ_RULES_TÄT: {
    category: 'DIE',
    label: <Text>-tät</Text>,
    text: (
      <Text>
        Die meisten Nomen mit der Endung
        <Text style={styles.textHighlight}> -tät </Text>
        sind weiblich (Femininum)
      </Text>
    ),
    examples: (
      <Text>
        die Quali<Text style={styles.textHighlight}>tät</Text>, die Universi
        <Text style={styles.textHighlight}>tät</Text>
      </Text>
    ),
  },
  FAQ_RULES_MENT: {
    category: 'DAS',
    label: <Text>-ment</Text>,
    text: (
      <Text>
        Nomen mit der Endung
        <Text style={styles.textHighlight}>-ment </Text>
        sind sächlich (Neutrum)
      </Text>
    ),
    examples: (
      <Text>
        das Medika<Text style={styles.textHighlight}>ment</Text>, das Instru
        <Text style={styles.textHighlight}>ment</Text>
      </Text>
    ),
  },
  FAQ_RULES_ER: {
    category: 'DER',
    label: <Text>-er</Text>,
    text: (
      <Text>
        Sehr viele Nomen mit der Endung
        <Text style={styles.textHighlight}> -er </Text>
        sind mänlich (Maskulinum)
      </Text>
    ),
    examples: (
      <Text>
        der Ärg<Text style={styles.textHighlight}>er</Text>, der Absend
        <Text style={styles.textHighlight}>er</Text>, der Brud
        <Text style={styles.textHighlight}>er</Text>
      </Text>
    ),
  },
  FAQ_RULES_ICH: {
    category: 'DER',
    label: <Text>-ich</Text>,
    text: (
      <Text>
        Nomen mit der Endung
        <Text style={styles.textHighlight}> -ich </Text>
        sind männlich (Maskulinum)
      </Text>
    ),
    examples: (
      <Text>
        der Tepp<Text style={styles.textHighlight}>ich</Text>, der Kran
        <Text style={styles.textHighlight}>ich</Text>
      </Text>
    ),
  },
  FAQ_RULES_COMPOUND_WORDS_FEM: {
    category: 'DIE',
    label: <Text>Zusammengesetzte Nomen mit weiblichem letzten Nomen</Text>,
    text: (
      <Text>
        Zusammengesetzte Nomen mit weiblichem letzten Nomen sind weiblich.
        (Femininum)
      </Text>
    ),
    examples: (
      <Text>
        die Berufs<Text style={styles.textHighlight}>schule</Text>, die Brief
        <Text style={styles.textHighlight}>marke</Text>, die Fleder
        <Text style={styles.textHighlight}>maus</Text>
      </Text>
    ),
  },
  FAQ_RULES_COMPOUND_WORDS_MASK: {
    category: 'DER',
    label: <Text>Zusammengesetzte Nomen mit männlichem letzten Nomen</Text>,
    text: (
      <Text>
        Zusammengesetzte Nomen mit männlichem letzten Nomen sind männlich
        (Maskulinum)
      </Text>
    ),
    examples: (
      <Text>
        der Brief<Text style={styles.textHighlight}>umschlag</Text>, der
        Familien
        <Text style={styles.textHighlight}>name</Text>, der Arbeits
        <Text style={styles.textHighlight}>platz</Text>
      </Text>
    ),
  },
  FAQ_RULES_COMPOUND_WORDS_NEUT: {
    category: 'DAS',
    label: <Text>Zusammengesetzte Nomen mit sächlichem letzten Nomen</Text>,
    text: (
      <Text>
        Zusammengesetzte Nomen mit sächlichem letzten Nomen sind sächlich
        (Neutrum)
      </Text>
    ),
    examples: (
      <Text>
        das Fernseh<Text style={styles.textHighlight}>gerät</Text>, das Rat
        <Text style={styles.textHighlight}>haus</Text>
      </Text>
    ),
  },
  FAQ_RULES_O: {
    category: 'DAS',
    label: <Text>-o</Text>,
    text: (
      <Text>
        Nomen mit der Endung
        <Text style={styles.textHighlight}> -o </Text>
        sind sehr oft sächlich (Neutrum)
      </Text>
    ),
    examples: (
      <Text>
        das Kin<Text style={styles.textHighlight}>o</Text>, das Radi
        <Text style={styles.textHighlight}>o</Text>, das Bür
        <Text style={styles.textHighlight}>o</Text>
      </Text>
    ),
  },
  FAQ_RULES_UM: {
    category: 'DAS',
    label: <Text>-um</Text>,
    text: (
      <Text>
        Nomen mit der Endung
        <Text style={styles.textHighlight}> -um </Text>
        sind meist sächlich (Neutrum)
      </Text>
    ),
    examples: (
      <Text>
        das Zentr<Text style={styles.textHighlight}>um</Text>, das Dat
        <Text style={styles.textHighlight}>um</Text>
      </Text>
    ),
  },
  FAQ_RULES_MALE_PERSON: {
    category: 'DER',
    label: <Text>Biologisch männlich gelesene Personen</Text>,
    text: (
      <Text>
        Biologisch männlich gelesene Personen sind meist männlich (Maskulinum)
      </Text>
    ),
    examples: (
      <Text>
        der <Text style={styles.textHighlight}>Mann</Text>, der
        <Text style={styles.textHighlight}>Junge</Text>, der
        <Text style={styles.textHighlight}> Opa</Text>
      </Text>
    ),
  },
  FAQ_RULES_FEMALE_PERSON: {
    category: 'DIE',
    label: <Text>Biologisch weiblich gelesene Personen</Text>,
    text: (
      <Text>
        Biologisch weiblich gelesene Personen sind meist weiblich (Femininum)
      </Text>
    ),
    examples: (
      <Text>
        die <Text style={styles.textHighlight}>Frau</Text>, die
        <Text style={styles.textHighlight}> Freundin</Text>, die
        <Text style={styles.textHighlight}> Oma</Text>
      </Text>
    ),
  },
};
