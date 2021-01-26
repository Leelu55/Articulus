import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import LessonStateIndicator from './LessonStateIndicator';
import PausePlayButton from './PausePlayButton';
import AutoModeButton from './AutoModeButton';
import sharedStyles from '../styles/sharedStyles';
import UIStore from '../stores/UIStore';

const styles = StyleSheet.create({
  controlBar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});
function ControlBar({
  chosenArticle,
  isCorrectArticle,
}: {
  chosenArticle: string;
  isCorrectArticle: boolean;
}) {
  const uiStore = useContext(UIStore);
  const lessonStateValue: string = uiStore.lessonState.valueOf();
  return (
    <View>
      <View style={[sharedStyles.viewHorizontal, styles.controlBar]}>
        <PausePlayButton />
        <LessonStateIndicator
          chosenArticle={chosenArticle}
          isCorrectArticle={isCorrectArticle}
          lessonStateValue={lessonStateValue}
          isInteractive={true}
          iconSize={60}
        />
        <AutoModeButton />
      </View>
    </View>
  );
}

export default observer(ControlBar);
