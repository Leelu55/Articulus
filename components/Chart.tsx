/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import {observer} from 'mobx-react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

function Chart({
  chartType = 'week',
  chartData = [],
}: {
  chartType: string;
  chartData: number[];
}) {
  const screenWidth = Dimensions.get('window').width;

  let data;
  if (chartType === 'week') {
    data = {
      labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      datasets: [{label: 'week', data: chartData}],
    };
  } else if (chartType === 'month') {
    data = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5'],
      datasets: [{label: 'month', data: chartData}],
    };
  } else if (chartType === 'year') {
    data = {
      labels: [
        'Jan',
        'Feb',
        'Mär',
        'Apr',
        'Mai',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Dez',
      ],
      datasets: [{label: 'year', data: chartData}],
    };
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
