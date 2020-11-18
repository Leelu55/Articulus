import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {useContext} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import UIStore from '../../stores/UIStore';
import WordsStore, {SavedLessonType} from '../../stores/WordsStore';
import Sparkles from './Sparkles';
import FlagLayer from './FlagLayer';
import ButtonBarView from './ButtonBarView';
import CatImage from './CatImage';
import CatChatBubble from './CatChatBubble';

function FinishedScreen() {
  const [doAnimSparkles, setDoAnimSparkles] = useState(false);
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  const navigation = useNavigation();
  const animFlag = useRef(new Animated.Value(0)).current;
  const animFlagOpacity = useRef(new Animated.Value(0)).current;
  const animButtonBarView = useRef(new Animated.Value(0)).current;
  const animCatChatBubble = useRef(new Animated.Value(0)).current;
  const animCat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // 1 Flagshow
      Animated.parallel([
        Animated.timing(animFlag, {
          toValue: 100,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.bounce,
        }),
        Animated.timing(animFlagOpacity, {
          toValue: 100,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]),
      Animated.parallel([
        Animated.timing(animFlagOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(animButtonBarView, {
          toValue: 100,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]),
    ]).start(() => {
      //AnimNumbers
      setDoAnimSparkles(true);

      // 3 CatShow
      Animated.parallel([
        Animated.timing(animCat, {
          toValue: 100,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(animCatChatBubble, {
          toValue: 100,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.bounce,
        }),
      ]).start();
    });
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
      <FlagLayer animFlag={animFlag} animFlagOpacity={animFlagOpacity} />

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
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  catContentWrapper: {flex: 1, alignItems: 'center', padding: 20},
});

export default observer(FinishedScreen);
