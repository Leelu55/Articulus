import {observable, action} from 'mobx';
import {create} from 'mobx-persist';
import {createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

class UIStore {
  @observable isInitial: Boolean = true;

  @action setIsInitial = (isInitial) => {
    this.isInitial = isInitial;
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
