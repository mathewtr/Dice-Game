'use strict';

// Selecting Element

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Declaring all the essential variable
let currentScore, score, activePlayer, playing;

const initialStage = function () {
  currentScore = 0;
  score = [0, 0];
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

initialStage();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate a random number according to dice and display dice
    const dice = Math.floor(Math.random() * 6) + 1;
    diceEl.setAttribute('src', `images/dice-${dice}.png`);
    //Display the dice roll
    diceEl.classList.remove('hidden');
    // if dice is not equal to 1
    if (dice !== 1) {
      // update currentScore
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // If dice === 1 then e switch the player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add Current Score to Total Score
    score[activePlayer] += currentScore;
    //Displaying total score
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // Total Score > 100 then active player WIN.
    if (score[activePlayer] >= 100) {
      // set State(playing) to false in order to stop the play.
      playing = false;
      // Hiding dice image.
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialStage);
