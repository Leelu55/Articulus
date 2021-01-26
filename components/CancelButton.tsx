import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  wrapperAll: {
    marginRight: 5,
  },
  wrapper: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  pressable: {
    padding: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#bbb',
    fontWeight: 'bold',
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});
export function CancelButton() {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapperAll}>
      <View style={styles.wrapper}>
        <Pressable
          style={[styles.pressable]}
          android_ripple={{color: 'lightgrey'}}
          onPress={() => {
            setTimeout(() => navigation.goBack(), 100);
          }}>
          <FontAwesomeIcon icon="times" color="lightgrey" size={40} />
        </Pressable>
      </View>
      <Text style={styles.text}>cancel</Text>
    </View>
  );
}
