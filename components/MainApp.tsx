import React, {useContext} from 'react';

import PlayerScreen from './PlayerScreen';
import EmptyWordsScreen from './EmptyWordsScreen';
import {observer} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StatisticsScreen from './StatisticsScreen';
import StartScreen from './StartScreen';
import UIStore from '../stores/UIStore';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import IntroSlider from './IntroSlider';
import FinishedScreen from './FinishedScreen/FinishedScreen';
import ConfigScreen from './ConfigScreen';
import CheckAudioVoiceConfig from './CheckAudioVoiceConfig';
import {CardStyleInterpolators} from '@react-navigation/stack';
import GrammarScreen from './GrammarScreen';
import {faSpellCheck} from '@fortawesome/free-solid-svg-icons';
import FaqScreen from './FaqScreen';

const HomeStack = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: 'floralwhite',
          height: 90,
          padding: 0,
          margin: 0,
        },
        showLabel: false,
        activeTintColor: 'black',
        inactiveTintColor: 'darkgray',
      }}>
      <Tab.Screen
        name="Home"
        component={StartScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon="broom" size={40} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Stats"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon="chart-bar" size={40} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Grammar"
        component={GrammarScreen}
        initialParams={{text: 'Grammatik'}}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faSpellCheck} size={40} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Faq"
        component={FaqScreen}
        initialParams={{text: 'FAQ'}}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon="question-circle" size={40} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="StartScreen" component={HomeStack} />
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
      <Stack.Screen name="EmptyWordsScreen" component={EmptyWordsScreen} />
      <Stack.Screen
        name="FinishedScreen"
        component={FinishedScreen}
        options={{
          title: 'FinishedScreen',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};

const ConfigStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="CheckAudioVoiceConfig"
        component={CheckAudioVoiceConfig}
      />
      <Stack.Screen name="ConfigScreen" component={ConfigScreen} />
    </Stack.Navigator>
  );
};
const MainApp = () => {
  const uiStore = useContext(UIStore);
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {uiStore.showIntro && (
          <Stack.Screen name="IntroScreen" component={IntroSlider} />
        )}
        {!uiStore.isConfigured && (
          <Stack.Screen name="ConfigScreen" component={ConfigStack} />
        )}

        <Stack.Screen name="AppScreen" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default observer(MainApp);
