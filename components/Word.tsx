import React from 'react';
import {View, Text} from 'react-native';

import model from '../model/model.json';
import Tts from 'react-native-tts';
import Voice from '@react-native-community/voice';

export default class Word extends React.Component {
  state = {wordIndex: 0};
  voiceStart = () => Voice.start('de-DE');

  componentDidMount() {
    // set callback handlers
    Tts.addEventListener('tts-finish', this.voiceStart);
    Voice.onSpeechResults = () => {
      if (this.state.wordIndex < model.words.length - 1) {
        this.setState({wordIndex: this.state.wordIndex + 1});
      }
    };

    // speak first word
    Tts.speak(model.words[this.state.wordIndex].value);
  }

  componentDidUpdate() {
    Tts.speak(model.words[this.state.wordIndex].value);
  }

  componentWillUnmount() {
    Tts.removeEventListener('tts-finish', this.voiceStart);
    Voice.onSpeechResults = undefined;
  }

  render() {
    return (
      <View>
        <Text>Word Component</Text>
        <Text>{model.words[this.state.wordIndex].value}</Text>
      </View>
    );
  }
}