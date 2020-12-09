import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';

//import settings from '../libs/settings.json';

function WordListItem({
  value,
  imageUrl,
  dueDateTime,
  slot,
  article,
}: {
  value: JSX.Element;
  imageUrl: string;
  dueDateTime: Date;
  slot: number;
  article: string;
}): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <Image style={styles.image} source={{uri: imageUrl}} />
      <View style={styles.textDateWrapper}>
        <View style={{flex: 1}}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
            {value}
          </Text>
        </View>

        <Text style={styles.dueDate}>{dueDateTime || 'heute'}</Text>
      </View>
      <View>
        <Text style={styles.slot}>{slot}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    borderWidth: 2,
    borderColor: '#ddd',
    marginVertical: 5,
    marginHorizontal: 30,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
  },
  textDateWrapper: {flexDirection: 'column', flex: 1, paddingLeft: 10},
  text: {flex: 1, fontSize: 20, fontWeight: 'bold'},
  image: {height: 45, width: 45, borderRadius: 5},
  dueDate: {fontSize: 13},
  slot: {fontWeight: 'bold', fontSize: 20, paddingHorizontal: 10},
});

export default WordListItem;
