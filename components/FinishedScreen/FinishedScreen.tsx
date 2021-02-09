import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {useContext} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import UIStore, {LessonState} from '../../stores/UIStore';
import WordsStore, {SavedLessonType} from '../../stores/WordsStore';
import Sparkles from './Sparkles';
import ButtonBarView from './ButtonBarView';
import CatImage from './CatImage';
import CatChatBubble from './CatChatBubble';
import settings from '../../libs/settings.json';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

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

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (
        ![LessonState.IsInitial, LessonState.IsSpeaking].includes(
          uiStore.lessonState,
        )
      ) {
        e.preventDefault();
      }
    });
  }, [navigation, uiStore.lessonState]);

  const currentLesson: SavedLessonType = wordsStore.savedLessons.slice(-1)[0];
  const intentText =
    'Ich habe gerade ' +
    currentLesson.countCorrectAnswers +
    ' deutsche Artikel mit Articulus gelernt! ';
  const intentUrl =
    'https://play.google.com/store/apps/details?id=com.derdiedas';
  var SendIntentAndroid = require('react-native-send-intent');

  return (
    <View style={[styles.wrapper, {paddingTop: StatusBar.currentHeight}]}>
      <View style={styles.catContentWrapper}>
        <CatChatBubble
          animCatChatBubble={animCatChatBubble}
          doAnim={doAnimSparkles}
          currentLesson={currentLesson}
        />
        <CatImage animCat={animCat} />
      </View>

      <Sparkles doCountAnim={doAnimSparkles} />
      <Pressable
        onPress={() =>
          SendIntentAndroid.sendText({
            title: 'Please share this text',
            text: intentText + intentUrl,
            type: SendIntentAndroid.TEXT_PLAIN,
          })
        }
        style={styles.shareButton}>
        <FontAwesomeIcon icon="share-alt" size={30} />
      </Pressable>
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
    backgroundColor: settings.colors.primary.background,
    flex: 1,
    flexDirection: 'column',
  },
  catContentWrapper: {flex: 1, alignItems: 'center', padding: 20},
  shareButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginBottom: 10,
    marginRight: 20,
    backgroundColor: settings.colors.secondary.normal,
    borderRadius: 50,
    justifyContent: 'center',
  },
});

export default observer(FinishedScreen);
