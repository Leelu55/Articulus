/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Animated,
  ImageBackground,
} from 'react-native';
import styles from '../styles/wordStyle';
import WordsStore from '../stores/WordsStore';
import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import {NavigationStackProp} from 'react-navigation-stack';

function StartScreen({navigation}: {navigation: NavigationStackProp}) {
  const wordsStore = useContext(WordsStore);
  const uiStore = useContext(UIStore);

  const onStartLesson = () => {
    wordsStore.emptyLesson();
    if (wordsStore.populateLesson()) {
      uiStore.setWordIndex(0);
      uiStore.setLessonState(LessonState.IsInitial);
      navigation.navigate('PlayerScreen');
    } else {
      navigation.navigate('EmptyWordsScreen');
    }
  };

  return (
    <View style={styles.startScreen}>
      <ImageBackground
        source={require('../assets/parrots.jpg')}
        style={{width: '100%', height: '100%', justifyContent: 'flex-end'}}>
        <Title />
        <View style={[styles.viewVertical, {padding: 0, margin: 0}]}>
          <TouchableHighlight
            style={[styles.startScreenButton, {backgroundColor: 'orange'}]}
            onPress={onStartLesson}>
            <Text style={[styles.startScreenButtonText, {color: 'white'}]}>
              START
            </Text>
          </TouchableHighlight>

          {/*    {![LessonState.IsInitial, LessonState.IsFinished].includes(
            uiStore.lessonState,
          ) && (
            <TouchableHighlight
              style={[styles.startScreenButton, {backgroundColor: 'lightgrey'}]}
              onPress={onContinueLesson}>
              <Text style={styles.startScreenButtonText}>Continue</Text>
            </TouchableHighlight>
          )} */}
        </View>
      </ImageBackground>
    </View>
  );
}

function Title() {
  const anim1 = useRef(new Animated.Value(1)).current;
  const anim2 = useRef(new Animated.Value(1)).current;
  const anim3 = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim1, {
          toValue: 1.25,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(anim1, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(anim2, {
          toValue: 1.25,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(anim2, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(anim3, {
          toValue: 1.25,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(anim3, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [anim1, anim2, anim3]);

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          styles.appTitleWrapper,
          {
            scaleX: anim1,
            scaleY: anim1,
            translateX: 60,
            translateY: 50,
            backgroundColor: '#fcc',
          },
        ]}>
        <Text style={styles.appTitle}>DER</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.appTitleWrapper,
          {
            scaleX: anim2,
            scaleY: anim2,
            translateX: 110,
            translateY: 180,
            backgroundColor: '#cfc',
          },
        ]}>
        <Text style={styles.appTitle}>DIE</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.appTitleWrapper,
          {
            scaleX: anim3,
            scaleY: anim3,
            translateX: 180,
            translateY: 100,
            backgroundColor: '#ccf',
          },
        ]}>
        <Text style={styles.appTitle}>DAS</Text>
      </Animated.View>
    </View>
  );
}
export default observer(StartScreen);
