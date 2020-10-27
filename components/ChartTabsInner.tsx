/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Chart from './Chart';

const initialLayout = {width: Dimensions.get('window').width};

function ChartTabsInner({
  wordsLearnedInSevenDays,
  wordsLearnedInWeeksOfMonth,
  wordsLearnedInOneYear,
}) {
  const [index, setIndex] = React.useState(0);

  const FirstRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#ff4081'}]}>
      <Chart chartType="week" chartData={wordsLearnedInSevenDays} />
    </View>
  );

  const SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
      <Chart chartType="month" chartData={wordsLearnedInWeeksOfMonth} />
    </View>
  );

  const ThirdRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
      <Chart chartType="year" chartData={wordsLearnedInOneYear} />
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

export default observer(ChartTabsInner);
