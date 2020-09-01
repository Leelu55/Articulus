import {observable, action} from 'mobx';
import {create, persist} from 'mobx-persist';
import {createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {WordType} from './WordsStore';

export enum AudioState {
  IsListening,
  IsSpeaking,
  IsInactive,
}

class UIStore {
  @observable isInitial: Boolean = true;
  @observable wordIndex: number = 0;
  @observable audioState: AudioState = AudioState.IsInactive;

  @persist('object') @observable lessonWords: WordType[] = [];

  //avoid mobx-persist error
  @persist foo: string = 'bar';

  //return to start screen
  @action setIsInitial = (isInitial) => {
    this.isInitial = isInitial;
  };

  @action setWordIndex = (wordIndex) => {
    this.wordIndex = wordIndex;
  };

  @action setAudioState = (audioState) => {
    this.audioState = audioState;
  };
}

const uiStore = new UIStore();

//configure persiting data
const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

hydrate('UIStore', uiStore).then(() =>
  console.log('UIStore has been hydrated'),
);

//create react context for my store
export default createContext(uiStore);
