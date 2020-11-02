import React from 'react';
import {View} from 'react-native';
import Chart from '../Chart';
import sharedStyles from '../../styles/sharedStyles';

function WeekChartTab({weekData}) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[sharedStyles.scene, {backgroundColor: '#ff4081'}]}>
      <Chart vdata={weekData} />
    </View>
  );
}
export default React.memo(WeekChartTab);
