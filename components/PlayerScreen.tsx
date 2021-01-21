import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {observer} from 'mobx-react';

import '../styles/sharedStyles';
import ControlBar from './ControlBar';
import {Header} from './Header';
import Word from './Word';
import sharedStyles from '../styles/sharedStyles';
import SelectorButton from './SelectorButton';
import UIStore, {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';

import {useContext} from 'react';
import PauseModal from './PauseModal';
import HintModal from './HintModal';

function PlayerScreen({navigation}) {
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  const currentLessonWord = wordsStore.lessonWords[uiStore.wordIndex];
  const correctArticle = currentLessonWord.article;

  console.log(uiStore.lessonState);
  useEffect(() => {
    if (uiStore.lessonState === LessonState.IsFinished) {
      navigation.navigate('FinishedScreen');
    }
  }, [navigation, uiStore.lessonState]);
  /* clicking startLesson() would lead to a crash because emptyLesson() is called and the PlayerScreen component being still
  mounted in the background (React.navigation!) would be rerendered with empty lessonWords.
  To prevent this, return null in case lessonWords is empty */
  if (wordsStore.lessonWords.length === 0) {
    return null;
  }
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <PauseModal
        isModalVisible={uiStore.lessonState === LessonState.IsPaused}
        setIsModalVisible={() => {
          uiStore.setLessonState(LessonState.IsSpeaking);
        }}
      />
      <Header />
      <Word />
      <ControlBar />
      <HintModal />
      <View
        style={[sharedStyles.viewHorizontal, styles.selectorButtonBarWrapper]}>
        <View style={sharedStyles.articleButtonWrapper}>
          <SelectorButton
            articleText="der"
            isCorrectArticle={correctArticle === 'der'}
          />
        </View>
        <View style={sharedStyles.articleButtonWrapper}>
          <SelectorButton
            articleText="die"
            isCorrectArticle={correctArticle === 'die'}
          />
        </View>
        <View style={sharedStyles.articleButtonWrapper}>
          <SelectorButton
            articleText="das"
            isCorrectArticle={correctArticle === 'das'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectorButtonBarWrapper: {
    marginBottom: 20,
  },
});
//extended component (observer with word)
export default observer(PlayerScreen);
