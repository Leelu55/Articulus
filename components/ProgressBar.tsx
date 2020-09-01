import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import UIStore from '../stores/UIStore';
import {observer} from 'mobx-react';
import WordsStore from '../stores/WordsStore';

function ProgressBar() {
  const wordIndex = useContext(UIStore).wordIndex;
  const wordsLength = useContext(WordsStore).words.length;

  return (
    <View>
      <Text>
        {wordIndex + 1} of {wordsLength}
      </Text>
    </View>
  );
}

export default observer(ProgressBar);
