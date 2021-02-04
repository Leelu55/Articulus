/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Animated, Pressable, Text} from 'react-native';
import startLesson from '../../libs/startLesson';
import sharedStyles from '../../styles/sharedStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ButtonBar from '../ButtonBar';
import settings from '../../libs/settings.json';

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
        <Pressable
          style={[
            sharedStyles.bigButton,
            {
              backgroundColor: 'white',
              margin: 0,
              marginRight: 20,
              width: 80,
            },
          ]}
          onPress={() => {
            navigation.navigate('Home', {comingFrom: 'FinishedScreen'});
          }}>
          <FontAwesomeIcon
            icon="home"
            size={40}
            color={settings.colors.primary.normal}
          />
        </Pressable>
        <Pressable
          style={[
            sharedStyles.bigButton,
            {margin: 0, flexDirection: 'row', flex: 1},
          ]}
          onPress={() => {
            wordsStore.populateLesson();
            startLesson(wordsStore, uiStore, navigation);
          }}>
          <Text style={sharedStyles.bigButtonText}>Neue Runde</Text>
        </Pressable>
      </ButtonBar>
    </Animated.View>
  );
}
