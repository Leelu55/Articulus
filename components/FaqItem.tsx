import {IconDefinition} from '@fortawesome/fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  Easing,
  View,
  Pressable,
} from 'react-native';

import settings from '../libs/settings.json';

function FaqItem({
  title,
  text,
  shortText,
  faIcon: faIcon,
}: {
  title: JSX.Element;
  text: JSX.Element;
  shortText: JSX.Element;
  faIcon: IconDefinition;
}): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const animValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!isCollapsed) {
      Animated.timing(animValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    }
  }, [animValue, isCollapsed]);
  const faPropIcon = faIcon as IconProp;

  return (
    <Pressable
      onPress={() => {
        Animated.timing(animValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease,
        }).start(() => setIsCollapsed(!isCollapsed));
      }}
      android_ripple={{color: 'white'}}
      style={styles.wrapper}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.faIconWrapper}>
          <FontAwesomeIcon icon={faPropIcon} size={40} />
        </View>
      </View>
      <View style={styles.textRow}>
        <Text style={[styles.text, styles.shortText]}>{shortText}</Text>
      </View>
      <FontAwesomeIcon icon={'ellipsis-h'} style={styles.more} size={20} />

      {!isCollapsed && (
        <Animated.Text
          style={[
            styles.text,
            {
              opacity: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}>
          {text}
        </Animated.Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: '#eee',
    marginRight: 35,
  },
  titleRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: settings.colors.primary.dark,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'lightgrey',
  },
  faIconWrapper: {
    position: 'absolute',
    top: -30,
    right: -30,
    backgroundColor: settings.colors.secondary.normal,
    borderRadius: 100,
    padding: 10,
  },
  textRow: {
    flexDirection: 'row',
  },
  more: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: '#ccc',
  },
  shortText: {
    paddingBottom: 0,
    paddingTop: 10,
    fontSize: 17,
    lineHeight: 22,
  },
  text: {
    lineHeight: 20,
    flex: 1,
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 20,
    textAlign: 'justify',
    paddingBottom: 20,
  },
});

export default FaqItem;
