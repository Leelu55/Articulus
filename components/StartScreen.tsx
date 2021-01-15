/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import WordsStore from '../stores/WordsStore';
import UIStore, {HintsShowCountType, LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import {NavigationStackProp} from 'react-navigation-stack';
import {useState} from 'react';
import StartModal from './StartModal';
import startLesson from '../libs/startLesson';
import settings from '../libs/settings.json';
import {useScreenToTop} from './hooks/useScreenToTop';
import WordListItem from './WordListItem';
import {hints} from '../libs/hints';

function StartScreen({navigation}: {navigation: NavigationStackProp}) {
  const wordsStore = useContext(WordsStore);
  const uiStore = useContext(UIStore);
  //console.log(wordsStore, uiStore);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const ref = React.useRef<ScrollView>(null);
  useScreenToTop(ref);

  useEffect(() => {
    let hintsShowCount: HintsShowCountType[] = [];
    Object.keys(hints).forEach((key) =>
      hintsShowCount.push({hintId: key, count: 0}),
    );
    uiStore.initializeHintsShowCount(hintsShowCount);
  }, [uiStore]);

  useEffect(() => {
    if (wordsStore.lessonWords.length === 0) {
      wordsStore.populateLesson();
    }
  }, [wordsStore, wordsStore.lessonWords]);

  if (wordsStore.lessonWords.length === 0) {
    return null;
  }

  function onStartModalLesson() {
    wordsStore.populateLesson();
    uiStore.setGrammarHintShown(false);

    uiStore.setLessonState(LessonState.IsSpeaking);
    uiStore.setWordIndex(0);
    navigation.navigate('PlayerScreen');
  }

  function onStartLesson() {
    startLesson(wordsStore, uiStore, navigation);
  }

  const onContinueLesson = () => {
    navigation.navigate('PlayerScreen');
    setIsModalVisible(false);
  };

  const renderItem = ({item}) => {
    return (
      <WordListItem
        value={item.value}
        imageUrl={item.imageUrl}
        dueDateTime={item.dueDateTime}
        slot={item.slot}
        article={item.article}
      />
    );
  };

  return (
    <>
      <FlatList
        style={styles.list}
        data={wordsStore.lessonWords}
        initialNumToRender={3}
        renderItem={renderItem}
        keyExtractor={(item, idx) => 'key' + idx}
        ListHeaderComponent={
          <View style={[sharedStyles.screen, {paddingBottom: 20}]}>
            <Text style={sharedStyles.screenTitle}>Willkommen</Text>
            <Text style={sharedStyles.screenSubTitle}>Heute lernst Du</Text>
          </View>
        }
      />
      <View style={styles.wrapper}>
        <StartModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onStartLesson={onStartModalLesson}
          onContinueLesson={onContinueLesson}
        />
        <View
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            margin: 20,
          }}>
          <Pressable
            android_ripple={{color: settings.colors.primary.superlight}}
            style={[sharedStyles.bigButton, {margin: 0}]}
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
    </>
  );
}
const styles = StyleSheet.create({
  wrapper: {backgroundColor: 'white'},
  list: {backgroundColor: 'white'},
});
export default observer(StartScreen);
