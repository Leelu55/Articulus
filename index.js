/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './components/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

AppRegistry.registerComponent(appName, () => App);
