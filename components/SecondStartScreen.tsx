/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import sharedStyles from '../styles/wordStyle';
import WordsStore from '../stores/WordsStore';
import UIStore, {LessonState} from '../stores/UIStore';
import {observer} from 'mobx-react';
import {NavigationStackProp} from 'react-navigation-stack';
import BucketView from './BucketView';
import LearnedWordsView from './LearnedWordsView';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {abs} from 'react-native-reanimated';
import ButtonBar from './ButtonBar';

function SecondStartScreen({navigation}: {navigation: NavigationStackProp}) {
  const wordsStore = useContext(WordsStore);
  const uiStore = useContext(UIStore);
  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [0, 1],
      },
    ],
  };

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

  const onContinueLesson = () => {
    navigation.navigate('PlayerScreen');
  };

  return (
    <View style={sharedStyles.startScreen}>
      <View
        style={[sharedStyles.viewVertical, {padding: 0, margin: 0, flex: 1}]}>
        <BucketView />

        <View style={{marginTop: 10, flex: 1}}>
          <Text
            style={{
              marginLeft: 12,
              fontSize: 30,
              fontWeight: 'bold',
              color: 'black',
            }}>
            20
          </Text>
          <View
            style={{flexDirection: 'row', margin: 12, alignItems: 'center'}}>
            <FontAwesomeIcon
              icon="arrow-alt-circle-up"
              size={20}
              color="green"
            />
            <Text
              style={{
                marginLeft: 10,
                color: 'green',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              +20 last week
            </Text>
          </View>
          {/**
           * hide unnessecary padding of chart remaining after rermoving the y-axis lable
           */}
          <View
            style={{
              width: screenWidth - 20,
              backgroundColor: 'lightgrey',
              height: 215,
              margin: 10,
              overflow: 'hidden',
            }}>
            <LineChart
           
           
              data={data}
              width={screenWidth - 20}
              height={200}
              bezier
              withHorizontalLabels={false}
              withVerticalLabels={false}
              withVerticalLines={false}
              chartConfig={{
                fillShadowGradientOpacity: 0.1,
                fillShadowGradient: 'green',
                backgroundGradientFrom: 'lightgrey',
                backgroundGradientTo: 'lightgrey',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 127, 0, ${opacity})`,
                style: {borderRadius: 16},
                strokeWidth: 4, // optional
                propsForBackgroundLines: {
                  strokeWidth: 1,
                  strokeDasharray: '',
                  strokeOpacity: 0.25,
                },
                propsForDots: {
                  r: '6',
                },
              }}
              renderDotContent={({x, y, index}) => {
                return (
                  <Text
                    style={{
                      position: 'absolute',
                      top: y,
                      left: x,
                      color: 'black',
                    }}>
                    {data.datasets[0].data[index]}{' '}
                  </Text>
                );
              }}
              style={{position: 'absolute', marginLeft: -30, paddingTop: 15}}
            />
          </View>
        </View>

        <ButtonBar>
          <TouchableHighlight
            style={[
              sharedStyles.startScreenButton,
              {backgroundColor: 'orange'},
            ]}
            onPress={onStartLesson}>
            <Text
              style={[sharedStyles.startScreenButtonText, {color: 'white'}]}>
              Start neue Runde
            </Text>
          </TouchableHighlight>

          {![LessonState.IsInitial, LessonState.IsFinished].includes(
            uiStore.lessonState,
          ) && (
            <TouchableHighlight
              style={[
                sharedStyles.startScreenButton,
                {backgroundColor: 'lightgrey'},
              ]}
              onPress={onContinueLesson}>
              <Text style={sharedStyles.startScreenButtonText}>Continue</Text>
            </TouchableHighlight>
          )}
        </ButtonBar>
      </View>
    </View>
  );
}
export default observer(SecondStartScreen);
