/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Animated} from 'react-native';
import startLesson from '../../libs/startLesson';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ButtonBar from '../ButtonBar';
import settings from '../../libs/settings.json';
import BigButton from '../BigButton';

export default function ButtonBarView({
  uiStore,
  navigation,
  wordsStore,
  animButtonBarView,
}: {
  uiStore;
  navigation;
  wordsStore;
  animButtonBarView: Animated.Value;
}) {
  return (
    <Animated.View
      style={{
        flexDirection: 'column',

        opacity: animButtonBarView.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1],
        }),
      }}>
      <ButtonBar>
        <BigButton
          style={{
            backgroundColor: 'white',
            margin: 0,
          }}
          onPress={() => {
            navigation.navigate('Home', {comingFrom: 'FinishedScreen'});
          }}
          text={
            <FontAwesomeIcon
              icon="home"
              size={40}
              color={settings.colors.primary.normal}
            />
          }
        />

        <BigButton
          style={{margin: 0}}
          onPress={() => {
            wordsStore.populateLesson();
            startLesson(wordsStore, uiStore, navigation);
          }}
          text="NEUE RUNDE"
        />
      </ButtonBar>
    </Animated.View>
  );
}
