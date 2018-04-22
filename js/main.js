var cards = ['queen','queen','king','king'];
var cardsInPlay = [];
/*
  Second, you'll create a function to group together the logic to check to see if the two cards that the user has flipped over match each other. You'll provide feedback to the user letting them know if the two cards match, or if they should try again.
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
  First you'll create a function that will store all steps related to selecting, or flipping over, a card. When the user flips a card over, you'll want to add that card to the array of cards that are in play. If the user has flipped over two cards, you'll want to check for a match.
*/
var flipCard = function(cardId) {
  cardsInPlay.push(cards[cardId]);
  console.log("User flipped " + cards[cardId] + ".");
  checkForMatch();
};

flipCard(0);
flipCard(2);
