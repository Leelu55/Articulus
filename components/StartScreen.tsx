import React, {useContext} from 'react';
import {View, Button, Text} from 'react-native';
import UIStore from '../stores/UIStore';

function StartScreen() {
  const uiStore = useContext(UIStore);

  return (
    <View>
      <Title />
      <Button
        title="begin learning"
        onPress={() => uiStore.setIsInitial(false)}
      />
    </View>
  );
}

function Title() {
  return (
    <Text
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
      }}>
      der die das
    </Text>
  );
}
export default StartScreen;
