/*
  Features added:
    - Board resets with shuffled cards.
    - Result of each game is displayed within the prompt to play again.
  Updates needed:
    - When the same card is clicked twice, tell user to pick again.
    - Get the second card to show that it's flipped over.
    - Add a reset button instead of a prompt.
    - Disable card flipping after the game is over.
    - Implement a way to keep track of and display the user's score.
*/

/*
  Game demo consists of these 4 card objects
*/
var cards = [
  {
    rank: 'Queen',
    suit: 'Hearts',
    cardImage: 'images/queen-of-hearts.png'
  },
  {
    rank: 'Queen',
    suit: 'Diamonds',
    cardImage: 'images/queen-of-diamonds.png'
  },
  {
    rank: 'King',
    suit: 'Hearts',
    cardImage: 'images/king-of-hearts.png'
  },
  {
    rank: 'King',
    suit: 'Diamonds',
    cardImage: 'images/king-of-diamonds.png'
  },
];

var cardsInPlay = [];

/*
  Check to see if the two cards that the user has flipped over match each other. You'll provide feedback to the user letting them know if the two cards match, or if they should try again.
*/
var checkForMatch = function() {
  if (cardsInPlay.length == 2) {
    var result;
    if (cardsInPlay[0] === cardsInPlay[1]) {
      result = "You found a match!";
    }
    else {
      result = "Sorry, try again.";
    }
    // Display result within prompt to play again
    if(cardsInPlay.length == 2){
      confirm(result + " Play again?");
      // Update this so that if user clicks OK then it resets, otherwise stays on the page while no longer able to flip cards.
      resetBoard();
      // Better yet, just create a reset button!
    }
    // Display result in-page below cards
    document.getElementById("gameResult").innerHTML = result;
    // Display result to console
    console.log(result);
  }
};

/*
  Selecting, or flipping over, a card... When the user flips a card over, you'll want to add that card to the array of cards that are in play. If the user has flipped over two cards, you'll want to check for a match.
*/
var flipCard = function() {
  var cardId = this.getAttribute('data-id');
  cardsInPlay.push(cards[cardId].rank);
  console.log("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit + ".");
  console.log("Card image: \'" + cards[cardId].cardImage + "\'");
  this.setAttribute('src', cards[cardId].cardImage);
  checkForMatch();
  // Doesn't seem to work, trying to disable clicking on cards after game
  // this.removeEventListener('click', flipCard);
};

/*
  Create a game board initially displaying the back of all cards (face down).
*/
var createBoard = function() {
  /*
    Iterate through available set of cards, creating a DOM node for each one and assigning an image and ID to it.
  */
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src', 'images/back.png');
    cardElement.setAttribute('data-id', i);
    cardElement.addEventListener('click', flipCard);
    document.getElementById('game-board').appendChild(cardElement);
    // Also works fine, alternatively...
    // document.querySelector('#game-board').appendChild(cardElement);
  }
};

/*
  Reset board: clear the cards in play and flip all cards back.
*/
var resetBoard = function() {
  cardsInPlay = [];
  for (var i = 0; i < cards.length; i++) {
    document.getElementById('game-board').innerHTML = '';
    // shuffle cards and re-create the board
    shuffle(cards);
    createBoard();
  }
};

/*
  Array shuffler, credit: Fisher-Yates (Knuth) Shuffle
*/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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
