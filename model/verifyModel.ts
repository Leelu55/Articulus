// testing the image download from pixabay, checking for duplicate images

function doRun() {
  const fs = require('fs');

  let rawModel = fs.readFileSync('model.json');
  let model = JSON.parse(rawModel);
  let words = model.words;

  console.log({wordsLength: words.length});

  let uniqueUrls = {};

  words.forEach((word) => {
    if (uniqueUrls[word.imageUrl]) {
      console.error('duplicate imageUrl found: ' + word.imageUrl);
    }
    uniqueUrls[word.imageUrl] = 1;
  });

  console.log({uniqueImageUrlsLength: Object.keys(uniqueUrls).length});
}

doRun();
