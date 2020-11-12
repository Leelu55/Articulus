/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

import {SavedLessonType} from '../stores/WordsStore';
import populateLineChart from '../libs/populateLineChart';
import WeekChartTab from './ChartTabs/WeekChartTab';
import MonthChartTab from './ChartTabs/MonthChartTab';
import YearChartTab from './ChartTabs/YearChartTab';
import settings from '../libs/settings.json';

const savedLessons: SavedLessonType[] = [
  {
    date: new Date('2020-11-06'),
    countCorrectAnswers: 25,
    countWrongAnswers: 0,
    words: [],
    isFinished: true,
  },
  {
    date: new Date('2020-11-07'),
    countCorrectAnswers: 25,
    countWrongAnswers: 0,
    words: [],
    isFinished: true,
  },
  {
    date: new Date('2019-11-08'),
    countCorrectAnswers: 125,
    countWrongAnswers: 0,
    words: [],
    isFinished: true,
  },
  {
    date: new Date('2020-11-09'),
    countCorrectAnswers: 50,
    countWrongAnswers: 0,
    words: [],
    isFinished: true,
  },
  {
    date: new Date('2020-11-05'),
    countCorrectAnswers: 7,
    countWrongAnswers: 0,
    words: [],
    isFinished: true,
  },
  {
    date: new Date('2020-09-25'),
    countCorrectAnswers: 20,
    countWrongAnswers: 0,
    words: [],
    isFinished: true,
  },
  {
    date: new Date('2020-05-24'),
    countCorrectAnswers: 13,
    countWrongAnswers: 0,
    words: [],
    isFinished: true,
  },
  {
    date: new Date('2020-10-23'),
    countCorrectAnswers: 25,
    countWrongAnswers: 0,
    words: [],
    isFinished: true,
  },

  {
    date: new Date('2020-05-23'),
    countCorrectAnswers: 25,
    countWrongAnswers: 0,
    words: [],
    isFinished: true,
  },
  {
    date: new Date('2020-10-22'),
    countCorrectAnswers: 2,
    countWrongAnswers: 0,
    words: [],
    isFinished: true,
  },
  {
    date: new Date('2020-01-21'),
    countCorrectAnswers: 5,
    countWrongAnswers: 0,
    words: [],
    isFinished: true,
  },
  {
    date: new Date('2020-01-20'),
    countCorrectAnswers: 6,
    countWrongAnswers: 0,
    words: [],
    isFinished: true,
  },
  {
    date: new Date('2020-01-19'),
    countCorrectAnswers: 10,
    countWrongAnswers: 0,
    words: [],
    isFinished: true,
  },
];

const initialLayout = {width: Dimensions.get('window').width};

function ChartTabs() {
  //get processed and formatted data for displaying week|year|months
  const chartData = populateLineChart(savedLessons);

  // tab index
  const [index, setIndex] = React.useState(0);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: settings.colors.secondary.normal,
        bottom: 0,
        height: 5,
      }}
      labelStyle={{
        fontWeight: 'bold',
        color: settings.colors.primary.dark,
      }}
      style={{
        backgroundColor: 'white',
        padding: 0,
      }}
    />
  );

  const routes = [
    {key: 'week', title: 'Week'},
    {key: 'month', title: 'Month'},
    {key: 'year', title: 'Year'},
  ];

  // https://github.com/satya164/react-native-tab-view#optimization-tips
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'week':
        return <WeekChartTab weekData={chartData._weekData} />;
      case 'month':
        return <MonthChartTab monthData={chartData._monthData} />;
      case 'year':
        return <YearChartTab yearData={chartData._yearData} />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.chartTabWrapper}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        tabBarPosition="top"
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  scene: {flex: 1},
  chartTabWrapper: {
    borderWidth: 5,
    overflow: 'hidden',
    margin: 10,
    borderColor: 'transparent',
  },
});

export default observer(ChartTabs);
