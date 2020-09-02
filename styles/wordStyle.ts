import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
    borderColor: 'red',
    borderWidth: 1,
    margin: 5,
    padding: 5,
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
  },

  articleButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },

  controllButton: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controllButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },

  audioStateIndicator: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 3,
    alignItems: 'center',
  },

  audioStateIndicatorText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },

 
});

export default styles;
