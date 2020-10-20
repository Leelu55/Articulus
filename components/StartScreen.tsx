/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Animated,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import sharedStyles from '../styles/wordStyle';
import WordsStore from '../stores/WordsStore';
import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import {NavigationStackProp} from 'react-navigation-stack';
import {useState} from 'react';
import {Modal} from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
function StartScreen({navigation}: {navigation: NavigationStackProp}) {
  const wordsStore = useContext(WordsStore);
  const uiStore = useContext(UIStore);
  const [modalVisible, setModalVisible] = useState(false);

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
    setModalVisible(!modalVisible);
  };

  return (
    <View style={sharedStyles.startScreen}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                onStartLesson();
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Start</Text>
            </TouchableHighlight>
            {![LessonState.IsInitial, LessonState.IsFinished].includes(
              uiStore.lessonState,
            ) && (
              <TouchableHighlight
                style={[sharedStyles.bigButton, {backgroundColor: 'lightgrey'}]}
                onPress={onContinueLesson}>
                <Text style={sharedStyles.bigButtonText}>Continue</Text>
              </TouchableHighlight>
            )}
          </View>
        </View>
      </Modal>

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
                setModalVisible(true);
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
