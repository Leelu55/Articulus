import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  startScreen: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  appTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
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
  progressBarContainer: {
    flex: 4,
    marginLeft: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  word: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 1,
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wordStyle: {
    fontSize: 50,
    fontWeight: 'bold',
  },

  articleButton: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 3,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },

  cancelButton: {
    marginRight: 5,
    borderRadius: 3,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },

  articleButtonText: {
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
    fontSize: 20,
  },

  controllButton: {
    margin: 10,
    padding: 10,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  lessonStateIndicator: {
    flex: 2,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
