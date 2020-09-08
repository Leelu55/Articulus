import {observable, action} from 'mobx';
import {create, persist} from 'mobx-persist';
import {createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {WordType} from './WordsStore';

export enum LessonState {
  IsListening,
  IsSpeaking,
  IsInactive,
  IsFinished,
}

class UIStore {
  @observable wordIndex: number = 0;
  @observable lessonState: LessonState = LessonState.IsInactive;


  @persist('object') @observable lessonWords: WordType[] = [];

  //avoid mobx-persist error
  @persist foo: string = 'bar';

  @action setWordIndex = (wordIndex) => {
    this.wordIndex = wordIndex;
  };

  @action setLessonState = (lessonState) => {
    this.lessonState = lessonState;
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
