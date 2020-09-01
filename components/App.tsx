import React from 'react';

import {Provider} from 'mobx-react';
import WordsStore from '../stores/WordsStore';

import UIStore from '../stores/UIStore';
import MainApp from './MainApp';

const App = () => {
  const stores = {
    wordsStore: WordsStore,
    uiStore: UIStore,
  };

  return (
    <Provider {...stores}>
      <MainApp />
    </Provider>
  );
};

export default App;
