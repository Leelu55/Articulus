import {StyleSheet} from 'react-native';
import settings from '../libs/settings.json';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 20,
  },
  screenTitle: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  screenSubTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'darkgrey',
    alignSelf: 'center',
  },
  screenHeaderIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    backgroundColor: settings.colors.primary.background,
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginTop: 20,
  },
  screenContent: {
    padding: 20,
  },
  wrongArticle: {
    flex: 1,
    padding: 24,
    backgroundColor: 'red',
  },
  rightArticle: {
    flex: 1,
    padding: 24,
    backgroundColor: 'green',
  },
  viewHorizontal: {
    flexDirection: 'row',
    margin: 5,
    padding: 5,
  },
  viewVertical: {
    flexDirection: 'column',
    margin: 5,
    padding: 5,
  },
  progressBar: {
    flex: 1,
    flexDirection: 'row',
    height: 20,
  },

  articleButton: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    backgroundColor: 'lightgrey',
  },

  bigButton: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: settings.colors.primary.normal,
    alignItems: 'center',
    justifyContent: 'center',
  },

  articleButtonText: {
    fontWeight: 'bold',
    color: 'black',
    padding: 5,
    fontSize: 30,
    position: 'absolute',
  },
  bigButtonText: {
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    fontSize: 30,
  },

  controlButton: {
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },

  lessonStateIndicator: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scene: {flex: 1},
  label: {
    borderRadius: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontWeight: 'bold',
    fontSize: 15,
    color: settings.colors.primary.dark,
    backgroundColor: settings.colors.secondary.normal,
  },
});

export default styles;
