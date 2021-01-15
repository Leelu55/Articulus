import {StyleSheet} from 'react-native';
import settings from '../libs/settings.json';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1,
    paddingTop: 20,
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
  screenContent: {},
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

  articleButtonWrapper: {
    flex: 1,
    borderRadius: 10,
    height: 70,
    marginLeft: 10,
    marginRight: 10,
  },

  articleButton: {
    flex: 1,
    borderRadius: 10,
    height: 70,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bigButton: {
    margin: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: settings.colors.primary.normal,
    alignItems: 'center',
    justifyContent: 'center',
  },

  articleButtonText: {
    fontWeight: 'bold',
    color: 'black',
    padding: 5,
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

  scene: {flex: 1},
  label: {
    borderRadius: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: settings.colors.primary.dark,
    backgroundColor: settings.colors.secondary.normal,
  },
});

export default styles;
