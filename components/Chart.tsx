/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import {observer} from 'mobx-react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {arrayRotate} from '../libs/utils';
import {extDayjs} from '../libs/utils';

function Chart({
  chartType = 'week',
  data = {},
}: {
  chartType: string;
  data: Object;
}) {
  const screenWidth = Dimensions.get('window').width;
  const today = new Date(Date.now());

  const currentCalWeek = extDayjs().week();
  console.log(currentCalWeek);

  if (chartType === 'week') {
    const targetChartData = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      targetChartData.push(data[dayIndex] || 0);
    }

    data = {
      labels: arrayRotate(
        ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        today.getDay() - 6,
      ),
      datasets: [
        {label: 'week', data: arrayRotate(targetChartData, today.getDay() - 6)},
      ],
    };
  } else if (chartType === 'month') {
    const targetChartData = [];
    const labels = [];
    for (let i = 4; i >= 0; i--) {
      const cw = extDayjs().subtract(i, 'week').week();
      console.log({i, cw});
      targetChartData.push(data[cw] || 0);
      labels.push('W' + cw);
    }

    data = {
      labels: labels,
      datasets: [{label: 'month', data: targetChartData}],
      //datasets: [{label: 'month', data: chartData}],
    };
  } else if (chartType === 'year') {
    const targetChartData = [];
    const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    for (let month = 1; month <= 12; month++) {
      console.log({month, data: data[month] || 0});
      targetChartData.push(data[month] || 0);
    }

    const numRotate = extDayjs().month() - 11;
    data = {
      labels: arrayRotate(labels, numRotate),
      datasets: [
        {label: 'month', data: arrayRotate(targetChartData, numRotate)},
      ],
      //datasets: [{label: 'month', data: chartData}],
    };

    /*
    const targetChartData = [];
    for (let i = 0; i < 12; i++) {
      targetChartData.push(0);
    }
    data = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      datasets: [{label: 'year', data: targetChartData}],
    };
    */
  }

  return (
    <View style={sharedStyles.screen}>
      {/**
       * hide unnessecary padding of chart remaining after rermoving the y-axis lable
       */}
      <View
        style={{
          width: screenWidth - 20,
          backgroundColor: 'white',
          height: 215,

          marginTop: 10,
        }}>
        <LineChart
          data={data}
          width={screenWidth - 20}
          height={200}
          withHorizontalLabels={false}
          withVerticalLabels={true}
          withVerticalLines={false}
          withHorizontalLines={false}
          chartConfig={{
            fillShadowGradientOpacity: 0.5,
            fillShadowGradient: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            color: (opacity = 1) => `rgb(255, 165, 0, ${opacity})`,
            style: {borderRadius: 16},
            strokeWidth: 8, // optional
            propsForBackgroundLines: {
              strokeWidth: 1,
              strokeDasharray: '',
              strokeOpacity: 0.25,
            },
            propsForDots: {
              r: '8',
            },
          }}
          renderDotContent={({x, y, index}) => {
            return (
              <Text
                key={index}
                style={{
                  position: 'absolute',
                  top: y - 30,
                  left: x - 3,
                  color: 'green',
                }}>
                {data.datasets[0].data[index]}
              </Text>
            );
          }}
          style={{position: 'absolute', marginLeft: -30, paddingTop: 15}}
        />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  savedLessonsWrapper: {
    backgroundColor: 'yellow',
    flexDirection: 'column',
  },
  scene: {flex: 1},
  heading: {fontWeight: 'bold', margin: 10, fontSize: 20},
});
export default observer(Chart);
