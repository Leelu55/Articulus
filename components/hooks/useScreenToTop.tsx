import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useScrollToTop, useFocusEffect} from '@react-navigation/native';

export function useScreenToTop(ref: React.MutableRefObject<ScrollView>) {
  useScrollToTop(ref);

  useFocusEffect(
    React.useCallback(() => {
      ref?.current?.scrollTo({y: 0, animated: true});
    }, [ref]),
  );
}
