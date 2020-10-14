import React from 'react';
import {View} from 'react-native';

function ButtonBar({children}: {children: React.ReactNode}) {
  return (
    <View style={{paddingTop: 10, paddingBottom: 0, backgroundColor: 'white'}}>
      {children}
    </View>
  );
}

export default ButtonBar;
