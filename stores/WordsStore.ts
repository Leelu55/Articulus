import {observable, action} from 'mobx';
import {persist, create} from 'mobx-persist';
import {createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import model from '../model/model.json';
import settings from '../libs/settings.json';
import populateLesson from '../libs/populateLesson';

export interface WordType {
  value: string;
  slot: number;
  article: string;
  timestamp: Date;
  imageUrl: string;
  dueDateTime: Date;
}

export interface LessonWordType {
  value: string;
  article: string;
  answerArticle: string;
  imageUrl: string;
}

//app data state
class WordsStore {
  @persist('object') @observable words: WordType[] = [];

  //load initial words array into WordsStore
  constructor() {
    if (this.words.length === 0) {
      let i = 0;
      for (const word of model.words) {
        this.words[i++] = word;
        console.log(word.slot);
      }
    }
  }
  @persist('object') @observable lessonWords: LessonWordType[] = [];

  // @return Boolean true if lesson words not empty, false otherwise
  // calss the populate lesson function with @param words array and current DateTime
  @action populateLesson = (): Boolean => {
    this.lessonWords = populateLesson(this.words, Date.now());
    return this.lessonWords.length ? true : false;
  };

  @action emptyLesson = () => {
    this.lessonWords = [];
  };

  @action setAnswerArticleForLessonWord = (
    value: string,
    answerArticle: string,
  ) => {
    const index = this.lessonWords.findIndex(
      (lessonWord) => lessonWord.value === value,
    );
    this.lessonWords[index].answerArticle = answerArticle;
  };

  @action incrementSlotForWord = (value: string) => {
    const index = this.words.findIndex((word) => word.value === value);
    if (this.words[index].slot < settings.numberOfSlots - 1) {
      this.words[index].slot++;
    }
  };

  @action decrementSlotForWord = (value: string) => {
    const index = this.words.findIndex((word) => word.value === value);
    if (this.words[index].slot > 0) {
      this.words[index].slot--;
    }
  };

  @action updateTimeStampForWord = (value: string) => {
    const index = this.words.findIndex((word) => word.value === value);
    this.words[index].timestamp = new Date();
  };

  @action updateDueDateTimeForWord = (value: string) => {
    const index = this.words.findIndex((word) => word.value === value);
    this.words[index].dueDateTime = new Date(
      Date.now() + Math.pow(2, this.words[index].slot) * 1000 * 60 * 60 * 24,
    );
    console.log(this.words[index].dueDateTime);
  };
}

//create state instance
const wordsStore = new WordsStore();

//configure persiting data
const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

hydrate('WordsStore', wordsStore).then(() =>
  console.log('WordsStore has been hydrated'),
);

//create react context for my store
export default createContext(wordsStore);
