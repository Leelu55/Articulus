import React, {useContext} from 'react';
import {View, TouchableHighlight} from 'react-native';
import styles from '../styles/wordStyle';
import UIStore from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import {observer} from 'mobx-react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import LessonStateIndicator from './LessonStateIndicator';
import { ForwardButton } from './ForwardButton';

function ControlBar() {
  const wordIndex = useContext(UIStore).wordIndex;
  const wordsLength = useContext(WordsStore).words.length;

  return (
    <View style={[styles.viewHorizontal, styles.controlBar]}>
      <ForwardButton />
      <LessonStateIndicator />
      <TouchableHighlight style={styles.controlButton} onPress={() => {}}>
        <FontAwesomeIcon icon="pause" size={20} color="white" />
      </TouchableHighlight>
    </View>
  );
}

export default observer(ControlBar);
