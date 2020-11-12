import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import WordsStore from '../stores/WordsStore';
import {useContext} from 'react';
import settings from '../libs/settings.json';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  outerBar: {
    flexDirection: 'column',
    height: 200,
    backgroundColor: 'lightgrey',
    marginTop: 5,
    justifyContent: 'flex-end',
    borderRadius: 30,
  },
  fillPercentage: {
    backgroundColor: settings.colors.primary.dark,
    minHeight: 30,
    minWidth: 30,
    borderRadius: 30,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',

    marginBottom: 5,
    color: 'green',
  },
  slotLabel: {
    color: settings.colors.primary.dark,
    marginTop: 15,
    transform: [{rotate: '45deg'}, {translateX: 10}],
  },
});
function BucketBar({
  slot,
  maxWordsForSlots,
}: {
  slot: number;
  maxWordsForSlots: number;
}) {
  const wordsStore = useContext(WordsStore);
  const wordsForSlot = wordsStore.wordsForSlot(slot);

  for (var i = 0; i < Math.min(slot, 4); i++) {}
  return (
    <View style={styles.wrapper}>
      <View style={styles.outerBar}>
        <Text style={styles.text}>{wordsForSlot}</Text>
        <View
          style={[
            styles.fillPercentage,
            {height: (wordsForSlot / maxWordsForSlots) * 100 + '%'},
          ]}
        />
      </View>
      <Text style={styles.slotLabel}>Stufe {slot}</Text>
    </View>
  );
}

export default BucketBar;
/*
<View
style={{
  alignSelf: 'flex-start',
  flexDirection: 'column',
  alignItems: 'center',
}}>
<Text style={styles.text}>{wordsStore.wordsForSlot(slot)}</Text>
<View style={styles.wrapper} />
</View> */
