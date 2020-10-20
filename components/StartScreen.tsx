/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableHighlight, ImageBackground} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import WordsStore from '../stores/WordsStore';
import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import {NavigationStackProp} from 'react-navigation-stack';
import {useState} from 'react';
import StartModal from './StartModal';
import StartScreenAnimation from './StartScreenAnimation';
import startLesson from '../libs/startLesson';

function StartScreen({navigation}: {navigation: NavigationStackProp}) {
  const wordsStore = useContext(WordsStore);
  const uiStore = useContext(UIStore);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function onStartLesson() {
    startLesson(wordsStore, uiStore, navigation);
  }

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
        <StartScreenAnimation />
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
            <Text style={[sharedStyles.bigButtonText]}>Start</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </View>
  );
}

export default observer(StartScreen);
