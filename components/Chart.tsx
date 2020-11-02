import React from 'react';
import {View, StyleSheet} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import {observer} from 'mobx-react';

import {
  VictoryAxis,
  VictoryLine,
  VictoryChart,
  VictoryScatter,
} from 'victory-native';

function Chart({vdata = []}: {vdata: any[]}) {
  return (
    <View style={sharedStyles.screen}>
      <VictoryChart
        height={220}
        padding={{left: 20, right: 50, top: 30, bottom: 60}}>
        <VictoryLine
          data={vdata}
          style={{
            data: {
              strokeWidth: 10,
              stroke: 'orange',
            },
          }}
        />

        <VictoryAxis
          offsetY={40}
          style={{
            axis: {strokeWidth: 5, stroke: 'grey', strokeOpacity: 0.5},
            tickLabels: {
              fill: 'grey',
              fontWeight: 'bold',
              angle: 0,
              margin: 10,
            },
          }}
        />

        {/* <VictoryArea
          data={vdata}
          style={{data: {fill: 'orange', opacity: 0.5}}}
          animate={{
            duration: 2000,
            onLoad: {duration: 1000},
          }}
        /> */}

        <VictoryScatter
          labels={({datum}) => datum.y}
          data={vdata}
          size={10}
          symbol="circle"
          style={{
            data: {fill: 'green', opacity: 1},
            // data: {
            //   strokeWidth: 3,
            //   stroke: 'green',
            //   borderColor: 'blue',
            //   fill: 'white',
            //   opacity: 1,
            // },
            labels: {
              fill: 'green',
              fontSize: 15,
              fontWeight: 'bold',
            },
          }}
        />
      </VictoryChart>
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
