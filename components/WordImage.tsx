import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const initialLayout = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const styles = StyleSheet.create({
  wordImage: {
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'lightgrey',
    height: initialLayout.height / 3.5,
    width: initialLayout.height / 3.5,
  },
});

export function WordImage({imageUrl}) {
  return <Image style={styles.wordImage} source={{uri: imageUrl}} />;
}
