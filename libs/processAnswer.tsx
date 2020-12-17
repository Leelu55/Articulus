import React from 'react';
import {LessonState} from '../stores/UIStore';

import {showHintModal} from '../components/HintModal';
import {LessonWordType} from '../stores/WordsStore';
import {UIStore as UIStoreType} from '../stores/UIStore';
import GrammarRule from '../components/GrammarRule';

export default function processAnswer(
  wordsStore: any,
  uiStore: UIStoreType,
  currentArticle,
) {
  const wordIndex = uiStore.wordIndex;
  const lessonWordsLength = wordsStore.lessonWords.length;
  const currentSavedLessonRef = wordsStore.savedLessons.slice(-1)[0];
  const clw: LessonWordType = wordsStore.lessonWords[wordIndex];

  wordsStore.setAnswerArticleForLessonWord(clw.value, currentArticle);
  //checkAnswer && checkArticle
  const index = currentSavedLessonRef.words.findIndex(
    (word) => word.value === clw.value,
  );
  if (index === -1) {
    throw new Error('word could not be found');
  }
  wordsStore.setAnswerArticleForSavedLessonWord(
    currentSavedLessonRef.words[index],
    currentArticle,
  );

  if (currentArticle === clw.article) {
    wordsStore.incrementSlotForWord(clw.value);
    wordsStore.incrementCountCorrectAnswers(currentSavedLessonRef);
    wordsStore.setIsAnswerCorrect(currentSavedLessonRef.words[index], true);
  } else {
    wordsStore.decrementSlotForWord(clw.value);
    wordsStore.incrementCountWrongAnswers(currentSavedLessonRef);
    wordsStore.setIsAnswerCorrect(currentSavedLessonRef.words[index]);
    wordsStore.setIsAnswerCorrect(currentSavedLessonRef.words[index], false);
  }

  wordsStore.updateTimeStampForWord(clw.value);
  wordsStore.updateDueDateTimeForWord(clw.value);
  uiStore.setLessonState(LessonState.IsEvaluating);

  setTimeout(() => {
    if (uiStore.lessonState === LessonState.IsEvaluating) {
      if (
        currentArticle !== clw.article &&
        clw.ruleId &&
        !uiStore.grammarHintShown
      ) {
        showHintModal(
          uiStore,
          <GrammarRule ruleId={clw.ruleId} />,
          showNextWord,
        );
      } else {
        showNextWord();
      }
    }
  }, 1000);

  function showNextWord() {
    if (wordIndex < lessonWordsLength - 1) {
      uiStore.setWordIndex(wordIndex + 1);
      uiStore.setLessonState(LessonState.IsSpeaking);
    } else {
      wordsStore.setSavedLessonIsFinished(currentSavedLessonRef, true);
      uiStore.setLessonState(LessonState.IsFinished);
    }
  }
}
