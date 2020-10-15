import React from 'react';
import {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {NavigationStackProp} from 'react-navigation-stack';
import UIStore from '../stores/UIStore';

const styles = StyleSheet.create({
  initialSettingsWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  initialSettingsText: {
    fontSize: 40,
    fontWeight: 'bold',
    flex: 1,
    marginTop: 30,
    alignSelf: 'center',
  },
  saveButton: {
    backgroundColor: 'mediumturquoise',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    flexDirection: 'row',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 30,
  },
});

function InitialSettingsScreen({
  navigation,
}: {
  navigation: NavigationStackProp;
}) {
  const uiStore = useContext(UIStore);
  const onShowApp = () => {
    uiStore.hideInitialSettings();
    navigation.navigate('AppScreen');
  };
  return (
    <View style={styles.initialSettingsWrapper}>
      <Text style={styles.initialSettingsText}>Initial Settings</Text>
      <TouchableHighlight onPress={onShowApp} style={styles.saveButton}>
        <Text style={[styles.saveButtonText]}>save</Text>
      </TouchableHighlight>
    </View>
  );
}

export default InitialSettingsScreen;
