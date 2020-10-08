import React from 'react';

import PlayerScreen from './PlayerScreen';
import EmptyWordsScreen from './EmptyWordsScreen';
import {observer} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SecondStartScreen from './SecondStartScreen';

const MainApp = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="StartScreen" component={SecondStartScreen} />
        <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
        <Stack.Screen name="EmptyWordsScreen" component={EmptyWordsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default observer(MainApp);
