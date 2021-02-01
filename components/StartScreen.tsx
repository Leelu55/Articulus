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
import {useState} from 'react';
import StartModal from './StartModal';
import startLesson from '../libs/startLesson';
import settings from '../libs/settings.json';
import {useScreenToTop} from './hooks/useScreenToTop';
import WordListItem from './WordListItem';
import {hints} from '../libs/hints';

function StartScreen({navigation, route}) {
  const wordsStore = useContext(WordsStore);
  const uiStore = useContext(UIStore);
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

  useEffect(() => {
    if (route.params?.comingFrom === 'FinishedScreen') {
      wordsStore.populateLesson();
      uiStore.setLessonState(LessonState.IsInitial);
    }
  }, [route, uiStore, wordsStore]);

  if (wordsStore.lessonWords.length === 0) {
    return null;
  }

  function onStartNewLesson() {
    wordsStore.populateLesson();
    uiStore.setGrammarHintShown(false);

    uiStore.setLessonState(LessonState.IsSpeaking);
    uiStore.setWordIndex(0);
    navigation.navigate('PlayerScreen');
  }

  const onContinueLesson = () => {
    navigation.navigate('PlayerScreen');
    setIsModalVisible(false);
  };

  const renderItem = ({item}) => {
    //use small image resizing in statically for FlatList
    const miniUrl = item.imageUrl + '?w=' + settings.thumbNailSize;
    return (
      <WordListItem
        value={item.value}
        imageUrl={miniUrl}
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
          onStartLesson={onStartNewLesson}
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
                startLesson(wordsStore, uiStore, navigation);
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
