/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View} from 'react-native';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import UIStore from '../stores/UIStore';

function ProgressBar() {
  const wordIndex = useContext(UIStore).wordIndex;
  //const wordsLength = useContext(WordsStore).words.length;
  const words = useContext(WordsStore).words;

  return (
    <View style={{backgroundColor: 'blue', flex: 1, flexDirection: 'row'}}>
      {words.map(function (word, index) {
        console.log({index}, {wordIndex});
        const bgColor =
          (index < wordIndex) || (wordIndex === words.length) ? 'green' : 'red';
        return (
          <View
            key={word.value}
            style={{
              flex: 1,
              backgroundColor: bgColor,
              borderColor: 'black',
              borderWidth: 1,
            }}
          />
        );
      })}
    </View>
  );
}
export default observer(ProgressBar);
