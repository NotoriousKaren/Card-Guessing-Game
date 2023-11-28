const cards = document.querySelectorAll('.cards');

var FlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!FlippedCard) {
    FlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  if (document.querySelectorAll('.flip').length === cards.length) {
    // All cards are flipped, display "You Win" popup
    showYouWinPopup();
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 500);
}

function resetBoard() {
  [FlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showYouWinPopup() {
  document.getElementById('victory-text').classList.add('visible');
}

function restartGame() {
  document.getElementById('victory-text').classList.remove('visible');

  // Reset all cards to their initial order
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

class bangolokerGame {
  victory() {
    showYouWinPopup();
  }
}

function ready() {
  let overlays = Array.from(document.getElementsByClassName('overlay-text'));
  let game = new bangolokerGame();

  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible');
      restartGame();
    });
  });
}

if (document.readyState === 'loading' && document.readyState === 'load') {
  document.addEventListener('DOMContentLoaded', ready());
} else {
  ready();
}
