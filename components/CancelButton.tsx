import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 5,
  },
});

export function CancelButton() {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.wrapper]}
      onPress={() => {
        navigation.goBack();
      }}>
      <FontAwesomeIcon icon="times" color="lightgrey" size={40} />
    </Pressable>
  );
}
