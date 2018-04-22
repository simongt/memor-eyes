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
  Create a function to group together the logic to check to see if the two cards that the user has flipped over match each other. You'll provide feedback to the user letting them know if the two cards match, or if they should try again.
*/
var checkForMatch = function() {
  if (cardsInPlay.length == 2) {
    if (cardsInPlay[0] === cardsInPlay[1]) {
      alert("You found a match!");
    }
    else {
      alert("Sorry, try again.");
    }
  }
};

/*
  Create a function that will store all steps related to selecting, or flipping over, a card. When the user flips a card over, you'll want to add that card to the array of cards that are in play. If the user has flipped over two cards, you'll want to check for a match.
*/
var flipCard = function(cardId) {
  cardsInPlay.push(cards[cardId].rank);
  console.log("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit + ".");
  console.log("Card image: \"" + cards[cardId].cardImage + "\"");
  checkForMatch();
};

flipCard(0);
flipCard(2);
