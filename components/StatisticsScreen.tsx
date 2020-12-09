/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useReducer} from 'react';
import {Text, View} from 'react-native';

import sharedStyles from '../styles/sharedStyles';
import {ScrollView} from 'react-native-gesture-handler';
import SavedLessons from './SavedLessons';
import ChartTabs from './ChartTabs';
import ProgressView from './ProgressView';
import BucketBarsChart from './BucketBarsChart';
import {useScreenToTop} from './hooks/useScreenToTop';
import StatisticGems from './SVGs/StatisticGems';

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

  const ref = React.useRef<ScrollView>(null);
  useScreenToTop(ref);

  return (
    <ScrollView style={sharedStyles.screen} ref={ref}>
      <Text style={sharedStyles.screenTitle}>Statistik</Text>
      <Text style={sharedStyles.screenSubTitle}>Deine Erfolge</Text>
      <View style={sharedStyles.screenHeaderIcon}>
        <StatisticGems width={150} />
      </View>
      <View style={[sharedStyles.screenContent, {margin: 20}]}>
        <ProgressView />
        <BucketBarsChart />
        <ChartTabs />
        <SavedLessons />
      </View>
    </ScrollView>
  );
}

export default StatisticsScreen;
