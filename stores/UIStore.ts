import {observable, action} from 'mobx';
import {create, persist} from 'mobx-persist';
import {createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export enum LessonState {
  IsInitial = 'IsInitial',
  IsSpeaking = 'IsSpeaking',
  IsRepeating = 'IsRepeating',
  IsWaitingForUserAction = 'IsWaitingForUserAction',
  IsListening = 'IsListening',
  IsEvaluating = 'IsEvaluating',
  IsPaused = 'IsPaused',
  IsFinished = 'IsFinished',
}

class UIStore {
  @observable wordIndex: number = 0;
  @observable lessonState: LessonState = LessonState.IsInitial;
  @observable currentAnswer: string = '';
  @observable repeatCount: number = 0;

  @persist @observable showIntro: boolean = true;
  @persist @observable showInitialSettings: boolean = true;

  @persist @observable autoMode: boolean = false;

  @action toggleAutoMode = () => {
    this.autoMode = !this.autoMode;
  };

  @action setAutoMode = (autoMode) => {
    this.autoMode = autoMode;
  };

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
    this.showIntro = false;
  };

  @action hideInitialSettings = () => {
    this.showInitialSettings = false;
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
