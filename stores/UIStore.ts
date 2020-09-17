import {observable, action} from 'mobx';
import {create, persist} from 'mobx-persist';
import {createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export enum LessonState {
  IsInitial,
  IsSpeaking,
  IsRepeating,
  IsListening,
  IsEvaluating,
  IsPaused,
  IsFinished,
}

class UIStore {
  @observable wordIndex: number = 0;
  @observable lessonState: LessonState = LessonState.IsInitial;
  @observable currentAnswer: string = '';

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
