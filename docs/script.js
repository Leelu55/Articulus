document.addEventListener('DOMContentLoaded', () => {
  const htmlElement = document.getElementsByClassName('carpet')[0];

  for (let i = 0; i < 20; i++) {
    const circleDiv = document.createElement('div');
    circleDiv.className = 'circle';

    circleDiv.style.width = Math.floor((i + 1) * 100) + 'px';
    circleDiv.style.height = Math.floor((i + 1) * 100) + 'px';

    htmlElement.appendChild(circleDiv);
  }

  for (let i = 0; i < 100; i++) {
    const starDiv = document.createElement('div');
    const articleText = document.createTextNode(
      (() => {
        const rand = Math.random();
        if (rand < 0.33) {
          return 'Der';
        }

        if (rand < 0.66) {
          return 'Die';
        }

        return 'Das';
      })(),
    );
    starDiv.appendChild(articleText);

    starDiv.className = 'star';

    starDiv.style.left = Math.floor(Math.random() * 100) + '%';
    starDiv.style.top = Math.floor(Math.random() * 100) + '%';
    starDiv.style.fontSize = Math.floor(Math.random() * 40 + 40) + 'px';

    starDiv.style.opacity = Math.random() / 8;

    htmlElement.appendChild(starDiv);
  }
});
