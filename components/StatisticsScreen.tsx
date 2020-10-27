import React, {useEffect, useReducer} from 'react';
import sharedStyles from '../styles/sharedStyles';
import BucketView from './BucketView';
import {ScrollView} from 'react-native-gesture-handler';
import SavedLessons from './SavedLessons';
import ChartTabs from './ChartTabs';

function StatisticsScreen({navigation}) {
  // https://reactjs.org/docs/hooks-reference.html#usereducer
  // useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    // only rerender when statistic tab gets focused
    return navigation.addListener('tabPress', () => {
      forceUpdate();
    });
  }, [navigation]);

  return (
    <ScrollView style={sharedStyles.screen}>
      <ChartTabs />
      <BucketView />
      <SavedLessons />
    </ScrollView>
  );
}

export default StatisticsScreen;
