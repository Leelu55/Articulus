import React from 'react';
import {View} from 'react-native';
import Chart from '../Chart';
import sharedStyles from '../../styles/sharedStyles';

function YearChartTab({yearData}) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[sharedStyles.scene, {backgroundColor: '#673ab7'}]}>
      <Chart vdata={yearData} />
    </View>
  );
}
export default React.memo(YearChartTab);
