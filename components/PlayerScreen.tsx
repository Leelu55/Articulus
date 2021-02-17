/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View, Text, Pressable} from 'react-native';

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
import PlayerOverlay from './PlayerOverlay';
import HintBubble from './HintBubble';
import settings from '../libs/settings.json';
import SnackBar from './SnackBar';

function PlayerScreen({navigation}) {
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  //used for fast animation of SelectorButtons, LessonStateIndicator
  const [chosenArticle, setChosenArticle] = useState<string>(null);
  const currentLessonWord = wordsStore.lessonWords[uiStore.wordIndex];
  const correctArticle = currentLessonWord.article;
  const isCorrectArticle = correctArticle === chosenArticle;

  useEffect(() => {
    setChosenArticle(uiStore.currentAnswer);
  }, [uiStore.currentAnswer, uiStore.spokenWordIndex]);

  //reset chosenArticle for each new word of lesson
  useEffect(() => {
    setChosenArticle(null);
  }, [currentLessonWord]);

  useEffect(() => {
    if (uiStore.lessonState === LessonState.IsFinished) {
      navigation.navigate('FinishedScreen');
    }
  }, [navigation, uiStore.lessonState]);

  const setChosenArticleDer = useCallback(() => setChosenArticle('der'), []);
  const setChosenArticleDie = useCallback(() => setChosenArticle('die'), []);
  const setChosenArticleDas = useCallback(() => setChosenArticle('das'), []);

  const onPressOverlay = useCallback(() => {
    uiStore.setIsDemoShown();
    uiStore.setLessonState(LessonState.IsSpeaking);
  }, [uiStore]);
  /* clicking startLesson() would lead to a crash because emptyLesson() is called and the PlayerScreen component being still
  mounted in the background (React.navigation!) would be rerendered with empty lessonWords.
  To prevent this, return null in case lessonWords is empty */
  if (wordsStore.lessonWords.length === 0) {
    return null;
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <PauseModal
        isModalVisible={uiStore.lessonState === LessonState.IsPaused}
        setIsModalVisible={() => {
          uiStore.setLessonState(LessonState.IsSpeaking);
        }}
      />

      <Header
        isHidden={!uiStore.isDemoShown}
        doAnimate={chosenArticle !== null}
        chosenArticle={chosenArticle}
      />

      <Word />
      <ControlBar
        chosenArticle={chosenArticle}
        isCorrectArticle={isCorrectArticle}
      />
      <HintModal />
      <View
        style={[sharedStyles.viewHorizontal, styles.selectorButtonBarWrapper]}>
        <View style={sharedStyles.articleButtonWrapper}>
          <SelectorButton
            articleText="der"
            isCorrectArticle={correctArticle === 'der'}
            isChosenArticle={chosenArticle === 'der'}
            hasChosenArticle={chosenArticle !== null}
            onPressAfter={setChosenArticleDer}
          />
          <HintBubble
            hintText={
              <Text>
                <Text style={{fontWeight: 'bold'}}>*Click* </Text>einen Artikel
              </Text>
            }
            position="topLeft"
            offsetX={10}
            offsetY={50}
            delay={250}
          />
        </View>
        <View style={sharedStyles.articleButtonWrapper}>
          <SelectorButton
            articleText="die"
            isCorrectArticle={correctArticle === 'die'}
            isChosenArticle={chosenArticle === 'die'}
            hasChosenArticle={chosenArticle !== null}
            onPressAfter={setChosenArticleDie}
          />
        </View>
        <View style={sharedStyles.articleButtonWrapper}>
          <SelectorButton
            articleText="das"
            isCorrectArticle={correctArticle === 'das'}
            isChosenArticle={chosenArticle === 'das'}
            hasChosenArticle={chosenArticle !== null}
            onPressAfter={setChosenArticleDas}
          />
        </View>
      </View>
      {uiStore.lessonState === LessonState.IsDemo && (
        <PlayerOverlay onPress={onPressOverlay} />
      )}
      {uiStore.lessonState === LessonState.IsDemo && <SnackBar />}
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
