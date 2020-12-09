import React, {ReactElement} from 'react';
import {
  faHandSparkles,
  IconDefinition,
  faMicrophone,
  faVolumeDown,
} from '@fortawesome/free-solid-svg-icons';
import {Text} from 'react-native';

interface FaqType {
  label: ReactElement;
  text: ReactElement;
  shortText: ReactElement;
  faIcon: IconDefinition;
}
export interface FaqsType {
  [key: string]: FaqType;
}

export const faqs: FaqsType = {
  FAQ_AUTOMODE: {
    label: <Text>Automatischer Modus</Text>,
    shortText: (
      <Text>
        Verwende den Freihand-Button um freihändiges Spielen ein- und
        auszuschalten
      </Text>
    ),
    text: (
      <Text>
        Im automatischen Modus kannst du die Artikel laut sagen, nachdem das
        Wort gesprochen wurde und wenn das Mikrophon aktiv ist. Articulus wertet
        deine Antwort aus und geht zum nächsten Wort.
      </Text>
    ),
    faIcon: faHandSparkles,
  },
  FAQ_SOUND_ON: {
    label: <Text>Sound</Text>,
    shortText: (
      <Text>
        Im automatischen Modus kannst du die Artikel laut sagen, nachdem das
        Wort gesprochen wurde und wenn das Mikrophon aktiv ist.
      </Text>
    ),
    text: (
      <Text>
        Wenn dein Telefon auf lautlos gestellt ist oder die Medientöne
        ausgestellt sind, kannst du Articulus nicht hören. Um die Worte zu hören
        und Feedback zu bekommen, stell deinen Telefonsound auf laut.
      </Text>
    ),

    faIcon: faMicrophone,
  },
  FAQ_ABOUT: {
    label: <Text>Über Articulus</Text>,
    shortText: (
      <Text>
        Articulus ist eine Lernsoftware für Artikel entworfen und gebaut von
        Maria Yalpani
      </Text>
    ),
    text: (
      <Text>
        Articulus ist eine Lern- software für Artikel entworfen und gebaut von
        Maria Yalpani.
      </Text>
    ),

    faIcon: faVolumeDown,
  },
};
