/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Animated,
  ImageBackground,
} from 'react-native';
import sharedStyles from '../styles/wordStyle';
import WordsStore from '../stores/WordsStore';
import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import {NavigationStackProp} from 'react-navigation-stack';
import {useState} from 'react';
import StartModal from './StartModal';

function StartScreen({navigation}: {navigation: NavigationStackProp}) {
  const wordsStore = useContext(WordsStore);
  const uiStore = useContext(UIStore);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onStartLesson = () => {
    wordsStore.emptyLesson();
    if (wordsStore.populateLesson()) {
      uiStore.setWordIndex(0);
      navigation.navigate('PlayerScreen');
    } else {
      navigation.navigate('EmptyWordsScreen');
    }
  };

  const onContinueLesson = () => {
    navigation.navigate('PlayerScreen');
    setIsModalVisible(false);
  };

  return (
    <View style={sharedStyles.startScreen}>
      <StartModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onStartLesson={onStartLesson}
        onContinueLesson={onContinueLesson}
      />

      <ImageBackground
        source={require('../assets/parrots.jpg')}
        style={{width: '100%', height: '100%', justifyContent: 'flex-end'}}>
        <Title />
        <View style={[sharedStyles.viewVertical, {padding: 0, margin: 0}]}>
          <TouchableHighlight
            style={[sharedStyles.bigButton]}
            onPress={() => {
              if (
                ![LessonState.IsInitial, LessonState.IsFinished].includes(
                  uiStore.lessonState,
                )
              ) {
                setIsModalVisible(true);
              } else {
                onStartLesson();
              }
            }}>
            <Text style={[sharedStyles.bigButtonText]}>START</Text>
          </TouchableHighlight>
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
          sharedStyles.appTitleWrapper,
          {
            scaleX: anim1,
            scaleY: anim1,
            translateX: 60,
            translateY: 50,
            backgroundColor: '#fcc',
          },
        ]}>
        <Text style={sharedStyles.appTitle}>DER</Text>
      </Animated.View>

      <Animated.View
        style={[
          sharedStyles.appTitleWrapper,
          {
            scaleX: anim2,
            scaleY: anim2,
            translateX: 110,
            translateY: 180,
            backgroundColor: '#cfc',
          },
        ]}>
        <Text style={sharedStyles.appTitle}>DIE</Text>
      </Animated.View>

      <Animated.View
        style={[
          sharedStyles.appTitleWrapper,
          {
            scaleX: anim3,
            scaleY: anim3,
            translateX: 180,
            translateY: 100,
            backgroundColor: '#ccf',
          },
        ]}>
        <Text style={sharedStyles.appTitle}>DAS</Text>
      </Animated.View>
    </View>
  );
}
export default observer(StartScreen);
