/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Chart from './Chart';

import {SavedLessonType} from '../stores/WordsStore';
import {extDayjs} from '../libs/utils';

const savedLessons: SavedLessonType[] = [
  {
    date: new Date('2020-10-28'),
    countCorrectAnswers: 25,
    countWrongAnswers: 0,
    words: [],
  },
  {
    date: new Date('2020-10-28'),
    countCorrectAnswers: 25,
    countWrongAnswers: 0,
    words: [],
  },
  {
    date: new Date('2019-10-28'),
    countCorrectAnswers: 125,
    countWrongAnswers: 0,
    words: [],
  },
  {
    date: new Date('2020-10-27'),
    countCorrectAnswers: 76,
    countWrongAnswers: 0,
    words: [],
  },
  {
    date: new Date('2020-10-26'),
    countCorrectAnswers: 7,
    countWrongAnswers: 0,
    words: [],
  },
  {
    date: new Date('2020-09-25'),
    countCorrectAnswers: 20,
    countWrongAnswers: 0,
    words: [],
  },
  {
    date: new Date('2020-05-24'),
    countCorrectAnswers: 13,
    countWrongAnswers: 0,
    words: [],
  },
  {
    date: new Date('2020-10-23'),
    countCorrectAnswers: 25,
    countWrongAnswers: 0,
    words: [],
  },

  {
    date: new Date('2020-05-23'),
    countCorrectAnswers: 25,
    countWrongAnswers: 0,
    words: [],
  },
  {
    date: new Date('2020-10-22'),
    countCorrectAnswers: 2,
    countWrongAnswers: 0,
    words: [],
  },
  {
    date: new Date('2020-01-21'),
    countCorrectAnswers: 5,
    countWrongAnswers: 0,
    words: [],
  },
  {
    date: new Date('2020-01-20'),
    countCorrectAnswers: 6,
    countWrongAnswers: 0,
    words: [],
  },
  {
    date: new Date('2020-01-19'),
    countCorrectAnswers: 10,
    countWrongAnswers: 0,
    words: [],
  },
];

const initialLayout = {width: Dimensions.get('window').width};

function mapChartData(_savedLessons) {
  const today = extDayjs();
  let weekData = {};
  let monthData = {};
  let yearData = {};

  _savedLessons.forEach((lesson) => {
    const lessonDate = extDayjs(lesson.date);
    if (today.diff(lessonDate, 'day') < 7) {
      weekData[lessonDate.day()] =
        lesson.countCorrectAnswers + (weekData[lessonDate.day()] || 0);
    }

    if (today.diff(lessonDate, 'day') < 35) {
      monthData[lessonDate.week()] =
        lesson.countCorrectAnswers + (monthData[lessonDate.week()] || 0);
    }

    if (today.diff(lessonDate, 'day') < 365) {
      yearData[lessonDate.month() + 1] =
        lesson.countCorrectAnswers + (yearData[lessonDate.month() + 1] || 0);
    }
  });

  //console.log({weekData, monthData, yearData});

  return {
    weekData,
    monthData,
    yearData,
  };
}

function ChartTabs() {
  const chartData = mapChartData(savedLessons);

  const [index, setIndex] = React.useState(0);

  const FirstRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#ff4081'}]}>
      <Chart chartType="week" data={chartData.weekData} />
    </View>
  );

  const SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
      <Chart chartType="month" data={chartData.monthData} />
    </View>
  );

  const ThirdRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
      <Chart chartType="year" data={chartData.yearData} />
    </View>
  );
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: 'green',
        top: 0,
        borderRadius: 50,
        height: 5,
      }}
      labelStyle={{
        fontWeight: 'bold',
      }}
      style={{
        backgroundColor: 'orange',
        padding: 0,
      }}
    />
  );
  const routes = [
    {key: 'first', title: 'Week'},
    {key: 'second', title: 'Month'},
    {key: 'third', title: 'Year'},
  ];

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <View style={styles.chartTabWrapper}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        tabBarPosition="bottom"
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  scene: {flex: 1},
  chartTabWrapper: {
    borderRadius: 20,
    borderWidth: 5,
    overflow: 'hidden',
    margin: 10,
    borderColor: 'orange',
  },
});

export default observer(ChartTabs);
