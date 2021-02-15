/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import MicLevel from '../MicLevel';
import sharedStyles from '../../styles/sharedStyles';
export default function ({isActive}: {isActive: boolean}) {
  const [width, setWidth] = useState(0);

  const onLayout = (e: {nativeEvent: {layout: {width: any}}}) => {
    console.log('onLayout');
    setWidth(e.nativeEvent.layout.width);
    console.log(width);
  };
  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'stretch',
      }}
      onLayout={onLayout}>
      {width !== 0 && <MicLevel isActive={isActive} width={width} />}
      <Pressable style={sharedStyles.bigButton}>
        <Text style={[sharedStyles.bigButtonText, {fontSize: 25}]}>
          Ich kann nichts sehen
        </Text>
      </Pressable>
    </View>
  );
}
