import React from 'react';

import PlayerScreen from './PlayerScreen';
import EmptyWordsScreen from './EmptyWordsScreen';
import {observer} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StatisticsScreen from './StatisticsScreen';
import StartScreen from './StartScreen';
import SkeletonScreen from './SkeletonScreen';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const SettingsScreen = () => <SkeletonScreen text="Settings" />;
const AboutScreen = () => <SkeletonScreen text="About" />;

const HomeStack = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: 'orange',
      }}>
      <Tab.Screen
        name="Home"
        component={StartScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Stats"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon="chart-bar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        initialParams={{text: 'Settings'}}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon="wrench" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        initialParams={{text: 'About'}}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon="question-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainApp = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="StartScreen" component={HomeStack} />
        <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
        <Stack.Screen name="EmptyWordsScreen" component={EmptyWordsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default observer(MainApp);
