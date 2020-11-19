/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

import populateLineChart from '../libs/populateLineChart';
import WeekChartTab from './ChartTabs/WeekChartTab';
import MonthChartTab from './ChartTabs/MonthChartTab';
import YearChartTab from './ChartTabs/YearChartTab';
import settings from '../libs/settings.json';
import WordsStore from '../stores/WordsStore';
import {useContext} from 'react';

const initialLayout = {width: Dimensions.get('window').width};

function ChartTabs() {
  const wordsStore = useContext(WordsStore);

  //get processed and formatted data for displaying week|year|months
  const chartData = populateLineChart(wordsStore.savedLessons);

  // tab index
  const [index, setIndex] = React.useState(0);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: settings.colors.secondary.normal,
        bottom: 0,
        height: 30,
        borderRadius: 20,
      }}
      labelStyle={{
        fontWeight: 'bold',
        fontSize: 15,
        color: settings.colors.primary.dark,
        transform: [{translateY: 10}],
      }}
      style={{
        backgroundColor: 'white',
        padding: 0,
        elevation: 0,
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
    <View style={styles.wrapper}>
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
  wrapper: {
    borderWidth: 5,
    overflow: 'hidden',
    margin: 10,
    marginTop: 20,
    borderColor: 'transparent',
  },
});

export default observer(ChartTabs);
