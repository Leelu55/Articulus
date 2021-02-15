/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import settings from '../libs/settings.json';
import WordSlot from './WordSlot';

//import settings from '../libs/settings.json';

function WordListItem({
  value,
  imageUrl,
  slot,
  article,
}: {
  value: JSX.Element;
  imageUrl: string;
  dueDateTime: Date;
  slot: number;
  article: string;
}): JSX.Element {
  const animValue = useRef(new Animated.Value(0)).current;

  function onListItemPressed() {
    animValue.setValue(0);
    Animated.timing(animValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.pressable}
        onPress={onListItemPressed}
        android_ripple={{color: 'lightgrey'}}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <View style={styles.textDateWrapper}>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
              {value}
            </Text>
          </View>
          <WordSlot slot={slot} />
          {/* <Text style={styles.slot}>
          Stufe {slot} von {settings.numberOfSlots - 1}
        </Text> */}
        </View>
        <Animated.View
          style={[
            styles.animatedTextWrapper,
            {
              opacity: animValue.interpolate({
                inputRange: [0, 0.2, 0.8, 1],
                outputRange: [0, 1, 1, 0],
              }),
            },
          ]}>
          <Text style={styles.animatedText}>{article}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: '#eee',
  },
  pressable: {
    padding: 5,
    borderColor: '#ddd',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
  },
  textDateWrapper: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10,
  },
  text: {flex: 1, fontSize: 20, fontWeight: 'bold'},
  animatedText: {fontSize: 20, fontWeight: 'bold', color: 'white'},
  animatedTextWrapper: {
    backgroundColor: settings.colors.correctAnswer,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  dueDate: {fontSize: 13},
  slot: {
    fontSize: 15,
    color: 'grey',
  },
});

export default WordListItem;
