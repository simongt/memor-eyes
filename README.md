# MemorEyes

MemorEyes is a card game in which all of the cards are laid face down on a surface and two cards are flipped face up over each turn. The object of the game is to turn over pairs of matching rank cards.

![MemorEyes](./images/memor-eyes.jpg)

The idea for this simple game app was adopted from General Assembly's [Dash](https://dash.generalassemb.ly/) learning curriculum.

## Getting Started

There are no dependencies for this app. Simply download / clone this repo to your local machine, open `index.html`. It is currently desktop-ready, best viewed with at least 640px width and 668px height.

## Backlog

* **Reset board and shuffle cards** before / after each round. ✓
* When a match is found, **display results** per each round. ✓
* Test for **mobile responsiveness** and **browser compatibility**. ✓
  * Create breakpoints for **width < 640px**. ✓
  * Create breakpoints for **668px > height > 480px**. ✓
* Detect when the **same card is clicked twice**, and tell user to pick again. ✓
* Display that the **second card flipped over** before win alert pops up. ✓
* **Disable card flipping** after the second card is flipped over. ✓
* Implement **asynchronous logic > timeouts**.
* Implement a **scoring system**.
  * **The less turns it takes** to find a match, the better the score (golf-like).
  * Update the **ticker display** (below cards).
* Once cards are matched up, make them fade away, **leaving rest of cards in place**.
  * Implement logic that allows the game to continue until **all** matches are found.
* Implement **elegant modals** instead of tacky `confirm` alerts.
  * http://kanecohen.github.io/modal-vanilla/
  * Add a game **restart button** within the modal.
* Make **navbar** useful, implement either **tabs or reveal/hide toggler** for links.
* Debug why **win alert is popping up twice** on mobile Safari.