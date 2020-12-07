import React, {useEffect} from 'react';
import settings from '../libs/settings.json';

import {Provider} from 'mobx-react';
import WordsStore from '../stores/WordsStore';

import UIStore from '../stores/UIStore';
import MainApp from './MainApp';
import DebugLessonState from './DebugLessonState';
// make following changes to App.js
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  /*  https://www.linkedin.com/pulse/easiest-way-add-splash-screen-react-native-app-2020-aldrin-jenson-1c
  call SplashScreen.hide() inside a useEffect hook.
 */

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const stores = {
    wordsStore: WordsStore,
    uiStore: UIStore,
  };

  return (
    <Provider {...stores}>
      <MainApp />
      {settings.isDebugging && <DebugLessonState />}
    </Provider>
  );
};

export default App;
