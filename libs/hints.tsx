import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LessonStateIndicator from '../components/LessonStateIndicator';
import {
  UIStore as UIStoreType,
  HintsShowCountType,
  LessonState,
} from '../stores/UIStore';
import dateMethods from './dateMethods';
import {getRandomInt} from './utils';
import {HintSelectorButtons} from '../components/HintSelectorButtons';
import {faHandSparkles} from '@fortawesome/free-solid-svg-icons';
interface HintType {
  text: ReactElement;
  icon: JSX.Element;
}
interface HintsType {
  [key: string]: HintType;
}
import sharedStyles from '../styles/sharedStyles';
const styles = StyleSheet.create({
  iconWrapper: {
    borderRadius: 1000,
    overflow: 'hidden',
    backgroundColor: 'lightgrey',
    width: 80,
    height: 80,
  },
});

export const hints: HintsType = {
  SPEAK_AFTER_SIGNAL: {
    text: (
      <Text>
        Bitte warte mit dem Sprechen, bis das Mikrophon lila pulsiert oder das
        Signal ertönt.
      </Text>
    ),
    icon: (
      <LessonStateIndicator
        lessonStateValue={LessonState.IsListening}
        isInteractive={false}
        iconSize={30}
      />
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
    icon: (
      <LessonStateIndicator
        lessonStateValue={LessonState.IsListening}
        isInteractive={false}
        iconSize={30}
      />
    ),
  },
  SPEAK_CLEARLY_QUIET_ENVIRONMENT: {
    text: (
      <>
        <Text>Sprich deutlich und achte auf eine ruhige Umgebung</Text>
      </>
    ),
    icon: (
      <LessonStateIndicator
        lessonStateValue={LessonState.IsListening}
        isInteractive={false}
        iconSize={30}
      />
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
    icon: (
      <LessonStateIndicator
        lessonStateValue={LessonState.IsListening}
        isInteractive={false}
        iconSize={30}
      />
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
    icon: <HintSelectorButtons />,
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
    icon: (
      <View style={[sharedStyles.controlButton, styles.iconWrapper]}>
        <FontAwesomeIcon icon={faHandSparkles} size={50} style={{}} />
      </View>
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
    'TURN_OFF_AUTOMODE',
    'TURN_OFF_AUTOMODE',
    'TURN_OFF_AUTOMODE',
    'TURN_OFF_AUTOMODE',
    'TURN_OFF_AUTOMODE',

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
