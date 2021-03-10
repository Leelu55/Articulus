import {observable, action, makeObservable} from 'mobx';
import {persist, create} from 'mobx-persist';
import {createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import model from '../model/model.json';
import settings from '../libs/settings.json';
import populateLesson from '../libs/populateLesson';
import {sortWordsByDueDateTime} from '../libs/sortWordsByDueDateTime';
import dateMethods from '../libs/dateMethods';

// words in pool
export interface WordType {
  value: string;
  slot: number;
  article: string;
  timestamp: Date;
  imageUrl: string;
  dueDateTime: Date;
  ruleId: string;
}

// words in lesson
export interface LessonWordType {
  value: string;
  article: string;
  answerArticle: string;
  imageUrl: string;
  ruleId: string;
}

// words in lesson history
export interface SavedLessonWordType {
  value: string;
  answerArticle: string;
  isAnswerCorrect: boolean | null;
  article: string;
}

export interface SavedLessonType {
  isFinished: boolean;
  date: Date;
  /**
   * counts the number of correct answers in the current lesson
   */
  countCorrectAnswers: number;
  countWrongAnswers: number;
  words: SavedLessonWordType[];
}

//app data state
class WordsStore {
  //load initial words array into WordsStore
  constructor() {
    makeObservable(this);

    if (this.words.length === 0) {
      let i = 0;
      for (const word of model.words) {
        this.words[i++] = word;
      }
    }
  }
  @persist('object') @observable lessonWords: LessonWordType[] = [];
  @persist('object') @observable words: WordType[] = [];

  // @return Boolean true if lesson words not empty, false otherwise
  // calss the populate lesson function with @param words array and current DateTime
  @action populateLesson = (): Boolean => {
    wordsStore.removeEmptySavedLessons();
    this.lessonWords = populateLesson(this.words, Date.now());
    let savedLessonWords = [];
    this.lessonWords.forEach((word) => {
      savedLessonWords.push({
        value: word.value,
        answerArticle: '',
        isAnswerCorrect: null,
        article: word.article,
      });
    });
    const newSavedLesson: SavedLessonType = {
      isFinished: false,
      countCorrectAnswers: 0,
      countWrongAnswers: 0,
      words: savedLessonWords,
      date: new Date(),
    };
    this.savedLessons.push(newSavedLesson);
    return this.lessonWords.length ? true : false;
  };

  @persist('object') @observable savedLessons: SavedLessonType[] = [];

  @action emptyLesson = () => {
    this.lessonWords = [];
  };

  @action removeEmptySavedLessons = () => {
    this.savedLessons = this.savedLessons.filter((lesson) => lesson.isFinished);
  };

  @action incrementCountCorrectAnswers = (savedLesson: SavedLessonType) => {
    savedLesson.countCorrectAnswers++;
  };
  @action incrementCountWrongAnswers = (savedLesson: SavedLessonType) => {
    savedLesson.countWrongAnswers++;
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

  @action setIsAnswerCorrect = (
    savedLessonWord: SavedLessonWordType,
    isAnswerCorrect: boolean,
  ) => {
    savedLessonWord.isAnswerCorrect = isAnswerCorrect;
  };

  @action setAnswerArticleForSavedLessonWord = (
    savedLessonWord: SavedLessonWordType,
    article: string,
  ) => {
    savedLessonWord.answerArticle = article;
  };

  @action setSavedLessonIsFinished = (
    savedLesson: SavedLessonType,
    isFinished: boolean,
  ) => {
    savedLesson.isFinished = isFinished;
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
    this.words[index].dueDateTime = dateMethods.articulusDateToJsDate(
      dateMethods.getFutureDate(Math.pow(2, this.words[index].slot)),
    );
  };

  nextDueDate = (): Date => {
    return this.words
      .filter((word) => word.dueDateTime !== null)
      .slice()
      .sort(sortWordsByDueDateTime)[0].dueDateTime;
  };

  wordsForSlot = (slot): number => {
    return this.words.filter((word) => word.slot === slot).length;
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
