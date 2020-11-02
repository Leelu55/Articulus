import React from 'react';
import {View} from 'react-native';
import Chart from '../Chart';
import sharedStyles from '../../styles/sharedStyles';

function MonthChartTag({monthData}) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[sharedStyles.scene, {backgroundColor: '#673ab7'}]}>
      <Chart vdata={monthData} />
    </View>
  );
}
export default React.memo(MonthChartTag);
