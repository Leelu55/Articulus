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
  @observable repeatCount: number = 0;

  @persist showIntro: boolean = true;

  @action setWordIndex = (wordIndex) => {
    this.wordIndex = wordIndex;
  };

  @action setLessonState = (lessonState) => {
    this.lessonState = lessonState;
  };

  @action increaseRepeatCount = () => {
    this.repeatCount++;
  };
  @action resetRepeatCount = () => {
    this.repeatCount = 0;
  };

  @action hideIntro = () => {
    console.error('hideIntro');
    this.showIntro = false;
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
