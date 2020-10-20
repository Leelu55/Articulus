import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  startScreen: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1,
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
  word: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  wordStyle: {
    fontSize: 80,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
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
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 3,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bigButton: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'orange',
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

  controlBar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default styles;
