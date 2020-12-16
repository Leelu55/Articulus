import {observable, action, makeObservable} from 'mobx';
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

// https://docs.google.com/spreadsheets/d/14dIMHZnvKTgqzzAMzdh42yP5bV4XNPLLOFb0TzOrbt4/edit?usp=sharing
const allowedStateTransitions = {
  [LessonState.IsInitial]: [LessonState.IsSpeaking],
  [LessonState.IsSpeaking]: [
    LessonState.IsSpeaking,
    LessonState.IsWaitingForUserAction,
    LessonState.IsListening,
    LessonState.IsEvaluating,
    LessonState.IsPaused,
    LessonState.IsFinished,
  ],
  [LessonState.IsRepeating]: [
    LessonState.IsSpeaking,
    LessonState.IsRepeating,
    LessonState.IsWaitingForUserAction,
    LessonState.IsListening,
    LessonState.IsEvaluating,
    LessonState.IsPaused,
    LessonState.IsFinished,
  ],
  [LessonState.IsWaitingForUserAction]: [
    LessonState.IsSpeaking,
    LessonState.IsWaitingForUserAction,
    LessonState.IsListening,
    LessonState.IsEvaluating,
    LessonState.IsPaused,
    LessonState.IsFinished,
  ],
  [LessonState.IsListening]: [
    LessonState.IsSpeaking,
    LessonState.IsRepeating,
    LessonState.IsWaitingForUserAction,
    LessonState.IsListening,
    LessonState.IsEvaluating,
    LessonState.IsPaused,
    LessonState.IsFinished,
  ],
  [LessonState.IsEvaluating]: [
    LessonState.IsSpeaking,
    LessonState.IsRepeating,
    LessonState.IsEvaluating,
    LessonState.IsPaused,
    LessonState.IsFinished,
  ],
  [LessonState.IsPaused]: [
    LessonState.IsSpeaking,
    LessonState.IsEvaluating,
    LessonState.IsPaused,
    LessonState.IsFinished,
  ],
  [LessonState.IsFinished]: [
    LessonState.IsSpeaking,
    LessonState.IsFinished,
    LessonState.IsInitial,
  ],
};

export class UIStore {
  @observable wordIndex: number = 0;
  @observable lessonState: LessonState = LessonState.IsInitial;
  @observable currentAnswer: string = '';
  @observable repeatCount: number = 0;
  @observable isHintModalVisible: boolean = false;
  @persist @observable showIntro: boolean = true;
  @persist @observable isConfigured: boolean = false;
  @persist @observable autoMode: boolean = true;

  // will always be reset to false after finishing a lessond
  @persist @observable grammarHintShown: boolean = false;

  constructor() {
    console.log('uist constr called');

    makeObservable(this);
  }

  @action toggleAutoMode = () => {
    this.autoMode = !this.autoMode;
  };

  @action setAutoMode = (autoMode) => {
    this.autoMode = autoMode;
  };

  @action setIsHintModalVisible = (isHintModalVisible) => {
    this.isHintModalVisible = isHintModalVisible;
  };

  @action setGrammarHintShown = (grammarHintShown) => {
    this.grammarHintShown = grammarHintShown;
  };

  @action setWordIndex = (wordIndex) => {
    this.wordIndex = wordIndex;
  };

  @action setLessonState = (lessonState) => {
    if (!allowedStateTransitions[this.lessonState].includes(lessonState)) {
      console.log(
        `tried to do unallowed transition from ${this.lessonState} to ${lessonState}`,
      );
      return;
    }

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

  @action hideConfig = () => {
    this.isConfigured = true;
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
