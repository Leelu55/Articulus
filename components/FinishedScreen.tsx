/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {useContext} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import startLesson from '../libs/startLesson';
import UIStore, {LessonState} from '../stores/UIStore';
import WordsStore, {SavedLessonType} from '../stores/WordsStore';

import sharedStyles from '../styles/sharedStyles';

import AnimatedNumber from './AnimatedNumber';
import AnimatedBubble from './AnimatedBubble';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ButtonBar from './ButtonBar';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    padding: 10,
  },
  modalText: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 20,
    marginBottom: 0,
  },
  countWrapper: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  countWrapperText: {
    fontSize: 16,
    marginBottom: 10,
    opacity: 0.4,
  },
  finishedIconWrapper: {
    borderRadius: 1000,
    backgroundColor: 'orange',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function FinishedScreen() {
  const [doCountAnim, setDoCountAnim] = useState(false);
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);
  const navigation = useNavigation();
  const animValue = useRef(new Animated.Value(0)).current;
  const animValuePosition = useRef(new Animated.Value(0)).current;
  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(animValue, {
          toValue: 50,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(animValuePosition, {
          toValue: 100,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]),
    ]).start(() => setDoCountAnim(true));
  }, [animValue, animValuePosition]);

  const getSparklesJsx = (color: string, numSparkles: number) => {
    let sparklesJsx = [];
    for (let i = 0; i < numSparkles; i++) {
      sparklesJsx.push(
        <AnimatedBubble
          duration={2000}
          maxSize={30}
          color={color}
          delay={500 + i * (1000 / numSparkles)}
          key={i}
          positionRandom={true}
          isFilled={false}
          easingFunction={(x: number): number => {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
          }}
          doStart={doCountAnim}
        />,
      );
    }
    return sparklesJsx;
  };

  const currentLesson: SavedLessonType = wordsStore.savedLessons.slice(-1)[0];
  return (
    <View style={styles.wrapper}>
      <View
        pointerEvents="none"
        style={[
          sharedStyles.viewVertical,
          {
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 1,
          },
        ]}>
        <Animated.View
          style={[
            styles.finishedIconWrapper,
            {
              transform: [
                {
                  scale: animValue.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 1],
                  }),
                },
                {
                  translateY: animValuePosition.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, -windowHeight + windowHeight / 3],
                  }),
                },
              ],
            },
          ]}>
          <FontAwesomeIcon icon="flag-checkered" size={100} color="white" />
        </Animated.View>
      </View>

      <Animated.View
        style={[
          sharedStyles.viewVertical,
          {
            opacity: animValuePosition.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 1],
            }),
            transform: [
              {
                scale: animValuePosition.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}>
        <View
          style={[
            sharedStyles.viewHorizontal,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <View style={[styles.countWrapper, {backgroundColor: '#dcedc8'}]}>
            <AnimatedNumber
              to={currentLesson.countCorrectAnswers}
              height={100}
              duration={2000}
              color="green"
              doStart={doCountAnim}
            />
            <Text style={[styles.countWrapperText, {color: 'green'}]}>
              Richtig
            </Text>
            {getSparklesJsx('green', currentLesson.countCorrectAnswers * 2)}
          </View>

          <View style={[styles.countWrapper, {backgroundColor: '#fbe9e7'}]}>
            <AnimatedNumber
              to={currentLesson.countWrongAnswers}
              height={100}
              duration={2000}
              color="red"
              doStart={doCountAnim}
            />
            <Text style={[styles.countWrapperText, {color: 'red'}]}>
              Falsch
            </Text>
            {getSparklesJsx('red', currentLesson.countWrongAnswers * 2)}
          </View>
        </View>

        <Text style={styles.modalText}>Neu beginnen oder aufhören?</Text>
        <ButtonBar>
          <Pressable
            style={[
              sharedStyles.bigButton,
              {
                backgroundColor: 'lightgrey',
                margin: 0,
                marginRight: 20,
                width: 80,
              },
            ]}
            onPress={() => {
              uiStore.setLessonState(LessonState.IsInitial);
              // go back to start screen
              navigation.goBack();
              navigation.goBack();
            }}>
            <FontAwesomeIcon icon="home" size={30} color="grey" />
          </Pressable>
          <Pressable
            style={[
              sharedStyles.bigButton,
              {margin: 0, flexDirection: 'row', flex: 1},
            ]}
            onPress={() => {
              startLesson(wordsStore, uiStore, navigation);
            }}>
            <Text style={sharedStyles.bigButtonText}>Nächste</Text>
            <FontAwesomeIcon icon="arrow-right" size={30} color="white" />
          </Pressable>
        </ButtonBar>
      </Animated.View>
    </View>
  );
}

export default observer(FinishedScreen);
