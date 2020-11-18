import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {useContext} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import UIStore from '../../stores/UIStore';
import WordsStore, {SavedLessonType} from '../../stores/WordsStore';
import Sparkles from './Sparkles';
import ButtonBarView from './ButtonBarView';
import CatImage from './CatImage';
import CatChatBubble from './CatChatBubble';
import settings from '../../libs/settings.json';

function FinishedScreen() {
  const [doAnimSparkles, setDoAnimSparkles] = useState(false);
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  const navigation = useNavigation();
  const animFlag = useRef(new Animated.Value(100)).current;
  const animFlagOpacity = useRef(new Animated.Value(100)).current;
  const animButtonBarView = useRef(new Animated.Value(0)).current;
  const animCatChatBubble = useRef(new Animated.Value(0)).current;
  const animCat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setDoAnimSparkles(true);

    //  CatShow
    Animated.parallel([
      Animated.timing(animButtonBarView, {
        toValue: 100,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(animCat, {
        toValue: 100,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(animCatChatBubble, {
        delay: 600,
        toValue: 100,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
    ]).start();
  }, [
    animButtonBarView,
    animCat,
    animCatChatBubble,
    animFlag,
    animFlagOpacity,
  ]);

  const currentLesson: SavedLessonType = wordsStore.savedLessons.slice(-1)[0];
  return (
    <View style={styles.wrapper}>
      {/*       <FlagLayer animFlag={animFlag} animFlagOpacity={animFlagOpacity} />
       */}
      <View style={styles.catContentWrapper}>
        <CatChatBubble
          animCatChatBubble={animCatChatBubble}
          doAnim={doAnimSparkles}
          currentLesson={currentLesson}
        />
        <CatImage animCat={animCat} />
      </View>

      <Sparkles doCountAnim={doAnimSparkles} />

      <ButtonBarView
        animButtonBarView={animButtonBarView}
        uiStore={uiStore}
        navigation={navigation}
        wordsStore={wordsStore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: settings.colors.bubbleBackground,
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  catContentWrapper: {flex: 1, alignItems: 'center', padding: 20},
});

export default observer(FinishedScreen);
