// game consists of these 4 card objects
const cards = [
  {
    rank: 'Queen',
    suit: 'Hearts',
    img_url: './images/queen-of-hearts.png',
  },
  {
    rank: 'Queen',
    suit: 'Diamonds',
    img_url: './images/queen-of-diamonds.png',
  },
  {
    rank: 'King',
    suit: 'Hearts',
    img_url: './images/king-of-hearts.png',
  },
  {
    rank: 'King',
    suit: 'Diamonds',
    img_url: './images/king-of-diamonds.png',
  },
];

// card URLs are ./ and not ../ since path is relative to index.html
const unFlippedCard = {
  img_url: './images/back.png',
};

let cardsInPlay = []; // game state

let t; // timeout (needed for clearing timeouts)

// create a game board initially displaying the back of all cards (face down)
createBoard = () => {
  // iterate through available set of cards, creating a DOM node for each one and assigning an image and ID to it
  const gameBoardNode = document.querySelector('div.game-board');
  shuffle(cards);
  cards.forEach((card, index) => {
    const cardNode = document.createElement('img');
    cardNode.setAttribute('src', unFlippedCard.img_url);
    cardNode.setAttribute('data-id', index);
    cardNode.classList.toggle('hide');
    cardNode.addEventListener('click', () => flipCard(cardNode, card));
    gameBoardNode.appendChild(cardNode);
    t = setTimeout(() => {
      cardNode.classList.toggle('reveal');
      cardNode.classList.toggle('fade-in');
    }, (index + 1) * 300);
  });
}

// when the user selects / flips over a card, add that card to the array of cards that are in play
flipCard = (cardNode, card) => {
  cardsInPlay.push(card);
  cardNode.classList.add('card-flipped');
  setTimeout(() => {
    cardNode.setAttribute('src', card.img_url);
    // when user has flipped over two cards, check for a match
    cardsInPlay.length === 2 && checkForMatch(cardNode, card)
  }, 250);
};


// if the two cards that the user has flipped over match each other, alert the user, otherwise flip cards back over and try again.
checkForMatch = (cardNode, card) => {
  pauseClicks(); // pause clicks once two cards are flipped over
  let resultMessage = '';
  if (cardsInPlay[0].rank === cardsInPlay[1].rank) {
    resultMessage = 'You found cards with matching ranks!';
    updateTicker(resultMessage);
  } else {
    const flippedCards = document.querySelectorAll('.card-flipped');
    flippedCards.forEach(flippedCard => {
      cardsInPlay.pop();
      setTimeout(() => {
        flippedCard.classList.remove('card-flipped');
        flippedCard.setAttribute('src', unFlippedCard.img_url);
        resumeClicks();  // resume clicks once all cards are flipped back
      }, 1000);
    });
  }
  // alert user of round result, prompt to play again
  resultMessage && setTimeout(() => {
    confirm(resultMessage + ' Play again?');
    fadeOutCards();
    resetBoard();
    resumeClicks(); // resume clicks once game board is reset
  }, 250);
};

// pause clicks to reduce unwanted behavior
pauseClicks = () => {
  const cards = document.querySelectorAll('div.game-board');
  cards.forEach(card => {
    card.style.pointerEvents = 'none';
  });
};

// resume clicks once it's safe to continue gameplay
resumeClicks = () => {
  const cards = document.querySelectorAll('div.game-board');
  cards.forEach(card => {
    card.style.pointerEvents = 'auto';
  });
};

// update the ticker <p> tag below the cards on display with round results
updateTicker = (message) => {
  const navbar = document.querySelector('p.game-result');
  navbar.innerHTML = message;
  const resetButton = document.createElement('button');
  navbar.appendChild(resetButton);
}

fadeOutCards = () => {
  const cardsToFadeOut = document.querySelectorAll('.game-board img');
  cardsToFadeOut.forEach((card, index) => {
    card.classList.toggle('fade-out');
  });
}

// Reset board: clear the cards in play and flip all cards back.
resetBoard = () => {
  cardsInPlay = [];
  cards.forEach((card, index) => {
    // clear the game board    
    clearTimeout(t);
    t = setTimeout(() => {
      updateTicker('Click on any two above cards to play!');
      document.querySelector('.game-board').innerHTML = '';
      shuffle(cards);
      createBoard();
    }, 500);
  });
};

/**
 * Array shuffler, credit: Fisher-Yates (Knuth) Shuffle
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

createBoard();
