import React from 'react';
import {View, Text} from 'react-native';

import model from '../model/model.json';
import Tts from 'react-native-tts';
import Voice from '@react-native-community/voice';

const MAX_LENGTH = 5;

export default class Word extends React.Component {
  state = {wordIndex: 0};
  voiceStart = () => Voice.start('de-DE');

  speakWord = () => Tts.speak(model.words[this.state.wordIndex].value);
  repeatWord = (prefixText) =>
    Tts.speak(prefixText + ',,' + model.words[this.state.wordIndex].value);

  checkArticle = (voiceResultArray) => {
    const newArray = voiceResultArray
      .filter(
        (resultString: string) => resultString.split(' ').length <= MAX_LENGTH,
      )
      .map((resultString: string) => {
        return resultString;
      });
    console.log(newArray);
  };

  componentDidMount() {
    // set callback handlers
    Tts.addEventListener('tts-finish', this.voiceStart);
    Voice.onSpeechResults = (event) => {
      console.log(event.value);
      if (this.state.wordIndex < model.words.length - 1) {
        this.setState({wordIndex: this.state.wordIndex + 1});
      }
    };

    Voice.onSpeechError = () => {
      this.repeatWord(
        'Ich habe dich nicht verstanden. Bitte wiederhole den Artikel für das Wort!',
      );
    };

    // speak first word
    this.speakWord();
  }

  componentDidUpdate() {
    this.speakWord();
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