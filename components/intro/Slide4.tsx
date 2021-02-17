/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import MicLevel from '../MicLevel';
import BigButton from '../BigButton';
export default function ({isActive}: {isActive: boolean}) {
  const [width, setWidth] = useState(0);

  const onLayout = (e: {nativeEvent: {layout: {width: any}}}) => {
    setWidth(e.nativeEvent.layout.width);
  };
  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'stretch',
      }}
      onLayout={onLayout}>
      {width !== 0 && <MicLevel isActive={isActive} width={width} />}
      <BigButton
        text="Ich kann nichts sehen"
        textStyle={{fontSize: 25}}
        onPress={() => {}}
      />
    </View>
  );
}
