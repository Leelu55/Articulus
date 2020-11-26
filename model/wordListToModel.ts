/*
after adding more words to the word_list.csv call this script in your shell by executing the command below:
$ node wordListToModel.ts > model.json
 */
const download = require('image-downloader');

const fs = require('fs');
const text = fs.readFileSync('./wordList.csv').toString('utf-8');
const textByLine = text.split('\n');

function saveImageToAssetsFolder(imageUrl) {
  const options = {
    url: imageUrl,
    dest: './images/',
  };
  download
    .image(options)
    .then(({filename}) => {
      console.warn('Saved to', filename);
    })
    .catch((err) => console.error(err));
}

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
    saveImageToAssetsFolder(wordData[2]);
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
console.warn(`There are ${wordsArray.length} words in your model`);
console.log(JSON.stringify(model));
