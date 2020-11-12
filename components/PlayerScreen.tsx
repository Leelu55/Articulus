import React, {useEffect} from 'react';
import {View} from 'react-native';

import {observer} from 'mobx-react';

import '../styles/sharedStyles';
import ControlBar from './ControlBar';
import {Header} from './Header';
import Word from './Word';
import styles from '../styles/sharedStyles';
import SelectorButton from './SelectorButton';
import {NavigationStackProp} from 'react-navigation-stack';
import UIStore, {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';

import {useContext} from 'react';

function PlayerScreen({navigation}: {navigation: NavigationStackProp}) {
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);

  useEffect(() => {
    if (uiStore.lessonState === LessonState.IsFinished) {
      navigation.navigate('FinishedScreen');
    }
  }, [navigation, uiStore.lessonState]);
  /* clicking startLesson() woukd to a crash because emptyLesson() is called and the PlayerScreen component being still
  mounted in the background (React.navigation!) would be rerendered with empty lessonWords.
  To prevent this, return null in case lessonWords is empty */
  if (wordsStore.lessonWords.length === 0) {
    return null;
  }
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <Header />
      <View style={[styles.viewHorizontal]}>
        <SelectorButton articleText="der" />
        <SelectorButton articleText="die" />
        <SelectorButton articleText="das" />
      </View>
      <Word />
      <ControlBar />
    </View>
  );
}

//extended component (observer with word)
export default observer(PlayerScreen);
