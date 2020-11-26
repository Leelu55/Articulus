/*
after adding more words to the word_list.csv call this script in your shell by executing the command below:
$ node wordListToModel.ts > ../model/model.json
 */

const fs = require('fs');
const text = fs.readFileSync('./wordList.csv').toString('utf-8');
const textByLine = text.split('\n');

const articles = ['der', 'die', 'das'];
const wordsArray = textByLine
  .filter((wordRaw) => {
    const wordData = wordRaw.split(' ');
    const wordOK = wordData.length === 3 && articles.includes(wordData[1]);
    if (!wordOK) {
      console.error(`Error because word ${wordData[0]} doesn't match rules`);
    }
    return wordOK;
  })
  .map((wordRaw) => {
    const wordData = wordRaw.split(' ');
    return {
      value: wordData[0],
      slot: 0,
      article: wordData[1],
      timestamp: null,
      dueDateTime: null,
      imageUrl: wordData[2],
    };
  });

const model = {words: wordsArray};
console.log(JSON.stringify(model));
