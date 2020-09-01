import React, {useContext} from 'react';
import {Button} from 'react-native';
import UIStore from '../stores/UIStore';

export function CancelButton() {
  const uiStore = useContext(UIStore);
  return (
    <Button
      title="cancel"
      onPress={() => {
        uiStore.setIsInitial(true);
      }}
    />
  );
}
