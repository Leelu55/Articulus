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
  progressBar: {
    flex: 1,
    flexDirection: 'row',
    height: 20,
  },
  word: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wordStyle: {
    fontSize: 80,
    fontWeight: 'bold',
  },

  wordImage: {
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'lightgrey',
    width: 150,
    height: 150,
  },

  articleButton: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 3,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButton: {
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  articleButtonText: {
    fontWeight: 'bold',
    color: 'black',
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

  controlBar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
