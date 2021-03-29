import React from 'react';
import {View, StyleSheet} from 'react-native';
import settings from '../libs/settings.json';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  slot: {
    borderColor: 'black',
    borderWidth: 1,
    width: 10,
    height: 10,
  },
});
function WordSlot({slot}: {slot: number}) {
  // TODO put real slot in
  let slots = [];
  for (let i = 0; i < settings.numberOfSlots; i++) {
    const backgroundColor = slot < i ? 'white' : settings.colors.correctAnswer;
    const borderRightWidth = i === settings.numberOfSlots - 1 ? 1 : 0;
    const borderTopLeftRadius = i === 0 ? 2.5 : 0;
    const borderBottomLeftRadius = i === 0 ? 2.5 : 0;
    const borderBottomRightRadius = i === settings.numberOfSlots - 1 ? 2.5 : 0;
    const borderTopRightRadius = i === settings.numberOfSlots - 1 ? 2.5 : 0;
    slots.push(
      <View
        key={i}
        style={[
          styles.slot,
          {
            backgroundColor,
            borderRightWidth,
            borderTopLeftRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
            borderTopRightRadius,
          },
        ]}
      />,
    );
  }
  return <View style={styles.wrapper}>{slots}</View>;
}

export default WordSlot;
