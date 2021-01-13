import React, {ReactElement} from 'react';
import {Text} from 'react-native';
import {UIStore as UIStoreType, HintsShowCountType} from '../stores/UIStore';
import dateMethods from './dateMethods';
import {getRandomInt} from './utils';
interface HintType {
  text: ReactElement;
}
interface HintsType {
  [key: string]: HintType;
}

export const hints: HintsType = {
  SPEAK_AFTER_SIGNAL: {
    text: (
      <>
        <Text>Sorry, Articulus hat noch geschlafen.</Text>
        <Text>
          Bitte warte mit dem Sprechen, bis das Mikrophon lila pulsiert oder das
          Signal ertönt.
        </Text>
      </>
    ),
  },
  SPEAK_AFTER_SIGNAL_REMIND: {
    text: (
      <>
        <Text>
          Denk dran, erst zu sprechen, wenn Articulus bereit ist und das Signal
          ertönt
        </Text>
      </>
    ),
  },
  SPEAK_CLEARLY_QUIET_ENVIRONMENT: {
    text: (
      <>
        <Text>Sprich deutlich und achte auf eine ruhige Umgebung</Text>
      </>
    ),
  },

  SAY_ARTICLE_WITH_WORD: {
    text: (
      <>
        <Text>
          Versuch doch mal den Artikel und das Wort zusammen zu sagen, z.B. Der
          Apfel
        </Text>
      </>
    ),
  },
  USE_ARTICLE_BUTTONS: {
    text: (
      <>
        <Text>
          Wenn Sprechen grade schwierig ist, weil du dich in einer lauten
          Umgebung befindest, kannst du auch jederzeit die Artikel Knöpfe
          drücken um zu antworten.
        </Text>
      </>
    ),
  },
  TURN_OFF_AUTOMODE: {
    text: (
      <>
        <Text>
          Du kannst auch nur mit den Artikel Buttons lernen ohne zu sprrechen.
          Schalte dafür den automatischen Modus einfach aus indem du auf die
          Zauberhand drückst.
        </Text>
      </>
    ),
  },
  TURN_ON_AUTOMODE: {
    text: (
      <>
        <Text>
          Denk dran, erst zu sprechen, wenn Articulus bereit ist und das Signal
          ertönt
        </Text>
      </>
    ),
  },
  SKIP_WORD: {
    text: (
      <>
        <Text>
          Denk dran, erst zu sprechen, wenn Articulus bereit ist und das Signal
          ertönt
        </Text>
      </>
    ),
  },
  NO_HINT_DUE: {
    text: (
      <>
        <Text style={{color: 'blue', fontSize: 20}}>NO HINT DUE</Text>
      </>
    ),
  },
  TEST: {
    text: (
      <>
        <Text style={{color: 'red', fontSize: 20}}>DUMMY TEXT</Text>
      </>
    ),
  },
};

export function hasDueHint(
  hintDateString: string,
  hintsShowCount: HintsShowCountType[],
): boolean {
  const totalHintShowCount = hintsShowCount
    .map((hint) => hint.count)
    .reduce((a, b) => a + b);
  console.log({
    totalHintShowCount,
    compareDates: dateMethods.compareDates(
      dateMethods.stringToDate(hintDateString),
      dateMethods.getCurrentDate(),
    ),
    stringToDate: dateMethods.stringToDate(hintDateString),
    getCurrentDate: dateMethods.getCurrentDate(),
  });
  if (
    totalHintShowCount > 5 &&
    hintDateString !== '' &&
    dateMethods.compareDates(
      dateMethods.stringToDate(hintDateString),
      dateMethods.getCurrentDate(),
    ) === 1
  ) {
    return false;
  }
  return true;
}

export function getSpeakHint(uiStore: UIStoreType): string {
  const totalHintShowCount = uiStore.hintsShowCount
    .map((hint) => hint.count)
    .reduce((a, b) => a + b);
  // No hint to be shown

  const hintsArray = [
    'SPEAK_AFTER_SIGNAL',
    'SPEAK_AFTER_SIGNAL_REMIND',
    'SPEAK_CLEARLY_QUIET_ENVIRONMENT',
    'SAY_ARTICLE_WITH_WORD',
    'USE_ARTICLE_BUTTONS',
    'TURN_OFF_AUTOMODE',
  ];

  // show all speak hints at least once in first app use
  const _hintId =
    totalHintShowCount <= 5
      ? hintsArray[totalHintShowCount]
      : hintsArray[getRandomInt(hintsArray.length - 1)];

  // set hint show date first time after all hints had been shown once
  if (totalHintShowCount === hintsArray.length - 1) {
    uiStore.updateHintDateString(
      //show random hint the next day
      dateMethods.dateToString(dateMethods.getFutureDate(1)),
    );
  }
  //show hints in increasingly greater intervals, at least all 32 days
  if (totalHintShowCount > hintsArray.length - 1) {
    uiStore.updateHintDateString(
      dateMethods.dateToString(
        dateMethods.getFutureDate(
          //after 2 days, 4, 8, 16, 32 days
          Math.pow(2, Math.min(5, totalHintShowCount - hintsArray.length)),
        ),
      ),
    );
  }
  const index = uiStore.hintsShowCount.findIndex(
    (hint) => hint.hintId === _hintId,
  );
  uiStore.increaseHintsShowCount(uiStore.hintsShowCount[index]);
  return _hintId;
}
