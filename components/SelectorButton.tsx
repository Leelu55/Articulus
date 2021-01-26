import {observer} from 'mobx-react';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Pressable, Text} from 'react-native';
import UIStore, {LessonState} from '../stores/UIStore';
import WordsStore from '../stores/WordsStore';
import styles from '../styles/sharedStyles';
import settings from '../libs/settings.json';
import processAnswer from '../libs/processAnswer';
import * as audioVoice from '../libs/audioVoice';
import AnimatedBubble from './AnimatedBubble';

function SelectorButton({
  articleText,
  fontSize = 30,
  isCorrectArticle = false,
  isChosenArticle = false,
  onPressAfter = () => {},
}: {
  articleText: string;
  fontSize?: number;
  isCorrectArticle?: boolean;
  isChosenArticle?: boolean;
  onPressAfter?: Function;
}) {
  const uiStore = useContext(UIStore);
  const wordsStore = useContext(WordsStore);

  const [isAnimating, setIsAnimating] = useState(true);
  useEffect(() => {
    setIsAnimating(true);
  }, [uiStore.wordIndex]);

  const onAnimationEnd = useCallback(
    ({finished}) => {
      setIsAnimating(false);

      if (finished) {
        processAnswer(wordsStore, uiStore, articleText);
      }
    },
    [articleText, uiStore, wordsStore],
  );
  const styleDefault = {opacity: 0.5};
  const styleCorrect = {
    backgroundColor: settings.colors.correctAnswer,
    opacity: 1,
  };
  const styleWrong = {backgroundColor: settings.colors.wrongAnswer, opacity: 1};

  const styleSelector = () =>
    isChosenArticle && isCorrectArticle
      ? styleCorrect
      : isChosenArticle && !isCorrectArticle
      ? styleWrong
      : styleDefault;

  const animationColor = isCorrectArticle
    ? settings.colors.correctAnswer
    : settings.colors.wrongAnswer;

  return (
    <Pressable
      disabled={[LessonState.IsEvaluating, LessonState.IsFinished].includes(
        uiStore.lessonState,
      )}
      style={[styles.articleButton, styleSelector()]}
      android_ripple={{color: 'white'}}
      onPress={() => {
        audioVoice.voiceStop();
        audioVoice.stopSpeakWord();

        //if(onPressAfter) onPressAfter()
        onPressAfter && onPressAfter();
      }}>
      <>
        <Text style={[styles.articleButtonText, {fontSize}]}>
          {articleText.toUpperCase()}
        </Text>

        {isChosenArticle && (
          <AnimatedBubble
            duration={600}
            maxSize={2000}
            color={animationColor}
            delay={0}
            positionRandom={false}
            doStart={isAnimating}
            onAnimationEnd={onAnimationEnd}
          />
        )}
      </>
    </Pressable>
  );
}

export default observer(SelectorButton);
