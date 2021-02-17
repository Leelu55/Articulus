/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import WordsStore from '../stores/WordsStore';
import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import {useState} from 'react';
import StartModal from './StartModal';
import startLesson from '../libs/startLesson';
import settings from '../libs/settings.json';
import {useScreenToTop} from './hooks/useScreenToTop';
import WordListItem from './WordListItem';

function StartScreen({navigation, route}) {
  const wordsStore = useContext(WordsStore);
  const uiStore = useContext(UIStore);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const ref = React.useRef<ScrollView>(null);
  useScreenToTop(ref);

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
    if (!uiStore.isDemoShown) {
      uiStore.setLessonState(LessonState.IsDemo);
    } else {
      uiStore.setLessonState(LessonState.IsSpeaking);
    }
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
        slot={item.slot ? item.slot : 0}
        article={item.article}
      />
    );
  };

  return (
    <SafeAreaView style={sharedStyles.screen}>
      <FlatList
        contentContainerStyle={{paddingTop: StatusBar.currentHeight}}
        data={wordsStore.lessonWords}
        initialNumToRender={3}
        renderItem={renderItem}
        keyExtractor={(item, idx) => 'key' + idx}
        ListHeaderComponent={
          <View style={[{paddingBottom: 20, marginTop: 10}]}>
            <Text style={sharedStyles.screenTitle}>Willkommen</Text>
            <Text style={sharedStyles.screenSubTitle}>Heute lernst Du</Text>
          </View>
        }
      />
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
    </SafeAreaView>
  );
}

export default observer(StartScreen);
