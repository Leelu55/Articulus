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
//import IntroSlider from './SVGs/UnAnimUnicornCat';
import FinishedScreen from './FinishedScreen/FinishedScreen';
import ConfigScreen from './ConfigScreen';
import CheckAudioVoiceConfig from './CheckAudioVoiceConfig';
import {CardStyleInterpolators} from '@react-navigation/stack';
import GrammarScreen from './GrammarScreen';
import {faSpellCheck} from '@fortawesome/free-solid-svg-icons';
import FaqScreen from './FaqScreen';
import settings from '../libs/settings.json';
import AnimatedTabBar, {
  TabsConfig,
  MaterialTabBarItemConfig,
} from '@gorhom/animated-tabbar';
import {StatusBar} from 'react-native';

const tabs: TabsConfig<MaterialTabBarItemConfig> = {
  Home: {
    icon: {
      component: () => (
        <FontAwesomeIcon icon="broom" size={40} color={'black'} />
      ),
      color: 'rgba(0,0,0,1)',
    },
    ripple: {
      color: settings.colors.secondary.normal,
    },
  },
  Stats: {
    icon: {
      component: () => (
        <FontAwesomeIcon icon="chart-bar" size={40} color={'black'} />
      ),
      color: 'rgba(0,0,0,1)',
    },
    ripple: {
      color: settings.colors.secondary.normal,
    },
  },
  Grammar: {
    icon: {
      component: () => (
        <FontAwesomeIcon icon={faSpellCheck} size={40} color={'black'} />
      ),
      color: 'rgba(0,0,0,1)',
    },
    ripple: {
      color: settings.colors.secondary.normal,
    },
  },
  Faq: {
    icon: {
      component: () => (
        <FontAwesomeIcon icon="question-circle" size={40} color={'black'} />
      ),
      color: 'rgba(0,0,0,1)',
    },
    ripple: {
      color: settings.colors.secondary.normal,
    },
  },
};

const HomeStack = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <AnimatedTabBar
          tabs={tabs}
          preset="material"
          animation="iconOnly"
          inactiveOpacity={0.35}
          inactiveScale={0.8}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{paddingVertical: 10}}
          {...props}
        />
      )}>
      <Tab.Screen name="Home" component={StartScreen} />
      <Tab.Screen name="Stats" component={StatisticsScreen} />
      <Tab.Screen
        name="Grammar"
        component={GrammarScreen}
        initialParams={{text: 'Grammatik'}}
      />
      <Tab.Screen
        name="Faq"
        component={FaqScreen}
        initialParams={{text: 'FAQ'}}
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
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
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
