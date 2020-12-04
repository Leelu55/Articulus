/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import WordsStore from '../stores/WordsStore';
import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import {NavigationStackProp} from 'react-navigation-stack';
import {useState} from 'react';
import StartModal from './StartModal';
import startLesson from '../libs/startLesson';
import UnicornCat from './SVGs/UnicornCat';

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
    <View style={sharedStyles.screen}>
      <StartModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onStartLesson={onStartLesson}
        onContinueLesson={onContinueLesson}
      />
      <View style={styles.catWrapper}>
        <UnicornCat />
      </View>
      <View style={[sharedStyles.viewVertical, {padding: 0, margin: 0}]}>
        <Pressable
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
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  catWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default observer(StartScreen);
