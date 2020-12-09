/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
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
import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import {NavigationStackProp} from 'react-navigation-stack';
import {useState} from 'react';
import StartModal from './StartModal';
import startLesson from '../libs/startLesson';
import settings from '../libs/settings.json';
import {useScreenToTop} from './hooks/useScreenToTop';
import WordListItem from './WordListItem';
import {isTemplateMiddle} from 'typescript';

function StartScreen({navigation}: {navigation: NavigationStackProp}) {
  const wordsStore = useContext(WordsStore);
  const uiStore = useContext(UIStore);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const ref = React.useRef<ScrollView>(null);
  useScreenToTop(ref);

  function onStartLesson() {
    startLesson(wordsStore, uiStore, navigation);
  }

  const onContinueLesson = () => {
    navigation.navigate('PlayerScreen');
    setIsModalVisible(false);
  };

  interface SortedType {
    value: string;
    imageUrl: string;
    dueDateTime: Date;
    slot: number;
    article: string;
  }
  const DATA: SortedType[] = Object.keys(wordsStore.words)
    .filter((word) => wordsStore.words[word].dueDateTime <= new Date() || null)
    .sort(() => 0.5 - Math.random())
    .map<SortedType>((word) => ({
      value: wordsStore.words[word].value,
      imageUrl: wordsStore.words[word].imageUrl,
      dueDateTime: wordsStore.words[word].dueDateTime,
      slot: wordsStore.words[word].slot,
      article: wordsStore.words[word].article,
    }))
    .sort((a: SortedType, b: SortedType) => {
      if (a.dueDateTime === null && b.dueDateTime === null) {
        return 0;
      }
      if (a.dueDateTime === null && b.dueDateTime !== null) {
        return -1;
      }
      if (a.dueDateTime !== null && b.dueDateTime === null) {
        return +1;
      }
      return b.dueDateTime.valueOf() - a.dueDateTime.valueOf();
    })
    .slice(0, 20);

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
        data={DATA}
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
          onStartLesson={onStartLesson}
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
