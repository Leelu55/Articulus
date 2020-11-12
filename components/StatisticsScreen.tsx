import React, {useEffect, useReducer} from 'react';
import sharedStyles from '../styles/sharedStyles';
import {ScrollView} from 'react-native-gesture-handler';
import SavedLessons from './SavedLessons';
import ChartTabs from './ChartTabs';
import ProgressView from './ProgressView';
import BucketBarsChart from './BucketBarsChart';

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
      <ProgressView />
      <BucketBarsChart />
      <ChartTabs />
      <SavedLessons />
    </ScrollView>
  );
}

export default StatisticsScreen;
