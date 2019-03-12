// Game demo consists of these 4 card objects
const cards = [
  {
    rank: 'Queen',
    suit: 'Hearts',
    img_url: './images/queen-of-hearts.png',
    isFlipped: false
  },
  {
    rank: 'Queen',
    suit: 'Diamonds',
    img_url: './images/queen-of-diamonds.png',
    isFlipped: false
  },
  {
    rank: 'King',
    suit: 'Hearts',
    img_url: './images/king-of-hearts.png',
    isFlipped: false
  },
  {
    rank: 'King',
    suit: 'Diamonds',
    img_url: './images/king-of-diamonds.png',
    isFlipped: false
  },
];

// card URLs are ./ and not ../ since path is relative to index.html
const unFlippedCard = {
  img_url: './images/back.png',
  isFlipped: false
};

let cardsInPlay = []; // game state

// Create a game board initially displaying the back of all cards (face down).
(createBoard = () => {
  // Iterate through available set of cards, creating a DOM node for each one and assigning an image and ID to it.
  const gameBoardNode = document.querySelectorAll('div.game-board')[0];
  cards.forEach((card, index) => {
    const cardNode = document.createElement('img');
    cardNode.setAttribute('src', unFlippedCard.img_url);
    cardNode.setAttribute('data-id', index);
    cardNode.addEventListener('click', () => flipCard(cardNode, card));
    gameBoardNode.appendChild(cardNode);
  });
})();

/*
  Selecting, or flipping over, a card... When the user flips a card over, you'll want to add that card to the array of cards that are in play. If the user has flipped over two cards, you'll want to check for a match.
*/
flipCard = (cardNode, card) => {
  cardsInPlay.push(card);
  cardNode.classList.add('card-flipped');
  setTimeout(() => {
    cardNode.setAttribute('src', card.img_url);
    cardsInPlay.length === 2 && checkForMatch(cardNode, card)
  }, 250);
};

/*
  Check to see if the two cards that the user has flipped over match each other, and provide feedback to the user letting them know if the two cards match, or if they should try again.
*/
checkForMatch = (cardNode, card) => {
  pauseClicks();
  let resultMessage = '';
  if (cardsInPlay[0].rank === cardsInPlay[1].rank) {
    resultMessage = 'You found cards with matching ranks!';
  } else {
    const flippedCards = document.querySelectorAll('.card-flipped');
    flippedCards.forEach(flippedCard => {
      cardsInPlay.pop();
      setTimeout(() => {
        flippedCard.classList.remove('card-flipped');
        flippedCard.setAttribute('src', unFlippedCard.img_url);
        resumeClicks();
      }, 1000);
    });
  }
  resultMessage && setTimeout(() => {
    confirm(resultMessage + ' Play again?');
    resetBoard();
    resumeClicks();
  }, 250);
};

pauseClicks = () => {
  const cards = document.querySelectorAll('div.game-board');
  cards.forEach(card => {
    card.style.pointerEvents = 'none';
  });
};

resumeClicks = () => {
  const cards = document.querySelectorAll('div.game-board');
  cards.forEach(card => {
    card.style.pointerEvents = 'auto';
  });
};

/*
  Reset board: clear the cards in play and flip all cards back.
*/
resetBoard = () => {
  cardsInPlay = [];
  cards.forEach((card, index) => {
    // clear the game board
    document.querySelectorAll('.game-board')[0].innerHTML = '';
    shuffle(cards);
    createBoard();
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
