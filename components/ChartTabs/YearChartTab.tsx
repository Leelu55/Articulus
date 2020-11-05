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

// https://github.com/satya164/react-native-tab-view#avoid-unnecessary-re-renders
export default React.memo(YearChartTab);
