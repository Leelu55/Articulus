import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {ReactElement, useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LessonStateIndicator from '../components/LessonStateIndicator';
import SelectorButton from '../components/SelectorButton';
import {
  UIStore as UIStoreType,
  HintsShowCountType,
  LessonState,
} from '../stores/UIStore';
import sharedStyles from '../styles/sharedStyles';
import settings from './settings.json';
import dateMethods from './dateMethods';
import {getRandomInt} from './utils';
import {Animated} from 'react-native';
interface HintType {
  text: ReactElement;
  icon: JSX.Element;
}
interface HintsType {
  [key: string]: HintType;
}

const styles = StyleSheet.create({
  iconWrapper: {
    marginTop: 10,
    marginBottom: 5,
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: settings.colors.primary.light,
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
      <View style={styles.iconWrapper}>
        <FontAwesomeIcon icon={'hand-sparkles'} color={'black'} size={30} />
      </View>
    ),
  },
};

function HintSelectorButtons(): JSX.Element {
  return (
    <View
      pointerEvents="none"
      style={[
        sharedStyles.viewHorizontal,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          marginBottom: 20,
          flex: 1,
        },
      ]}>
      <HintSelectorButtonWrapper>
        <SelectorButton articleText="der" fontSize={25} />
      </HintSelectorButtonWrapper>
      <HintSelectorButtonWrapper>
        <SelectorButton articleText="die" fontSize={25} />
      </HintSelectorButtonWrapper>
      <HintSelectorButtonWrapper>
        <SelectorButton articleText="das" fontSize={25} />
      </HintSelectorButtonWrapper>
    </View>
  );
}

function HintSelectorButtonWrapper({children}): JSX.Element {
  const animValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 100,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [animValue]);

  return (
    <Animated.View
      style={[
        sharedStyles.articleButtonWrapper,
        {
          backgroundColor: animValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['rgb(244,81,44)', 'rgb(76,187,23)'],
          }),
        },
      ]}>
      {children}
    </Animated.View>
  );
}
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
