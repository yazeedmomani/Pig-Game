'use strict';

//Yaz Library
const yaz = {
  select: function (selector) {
    return document.querySelector(selector);
  },

  setText: function (selector, value) {
    this.select(selector).textContent = value;
  },

  click: {
    button: function (selector, action) {
      yaz.select(selector).addEventListener('click', action);
    },
  },

  class: {
    remove: function (selector, value) {
      yaz.select(selector).classList.remove(value);
    },

    add: function (selector, value) {
      yaz.select(selector).classList.add(value);
    },

    toggle: function (selector, value) {
      yaz.select(selector).classList.toggle(value);
    },
  },
};

//Variables
let score, current, isOver, currentPlayer, maxScore = 100;

const game = {
  switchPlayer: function () {
    //Set current score to 0
    current[currentPlayer] = 0;
    yaz.setText(`#current--${currentPlayer}`, current[currentPlayer]);

    //Switch active player
    yaz.class.toggle(`.player--${currentPlayer}`, 'player--active');
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    yaz.class.toggle(`.player--${currentPlayer}`, 'player--active');
  },

  start: function () {
    score = [0, 0];
    current = [0, 0];
    isOver = false;
    currentPlayer = 0;
    for (let i = 0; i <= 1; i++) {
      yaz.setText(`#current--${i}`, '0');
      yaz.setText(`#score--${i}`, '0');
      yaz.class.remove(`.player--${i}`, 'player--winner');
      yaz.class.remove(`.player--${i}`, 'player--active');
    }
    yaz.class.add(`.player--${currentPlayer}`, 'player--active');
    yaz.class.add('.dice', 'hide');
    yaz.class.remove('.btn--roll', 'hide');
    yaz.class.remove('.btn--hold', 'hide');
    yaz.class.remove('.btn--new', 'animate');
  },

  roll: function () {
    //Roll the dice
    const rand = Math.trunc(Math.random() * 6) + 1;
    yaz.select('.dice').src = `dice-${rand}.png`;
    yaz.class.remove('.dice', 'hide');

    //Check if dice = 1
    if (rand === 1) {
      game.switchPlayer();
    } else {
      //Add result to current score
      current[currentPlayer] += rand;
      yaz.setText(`#current--${currentPlayer}`, current[currentPlayer]);
    }
  },

  hold: function () {
    //Hold score for current player
    score[currentPlayer] += current[currentPlayer];
    yaz.setText(`#score--${currentPlayer}`, score[currentPlayer]);

    //Check if the player has won
    if (score[currentPlayer] >= maxScore) {
      yaz.class.remove(`.player--${currentPlayer}`, 'player--active');
      yaz.class.add(`.player--${currentPlayer}`, 'player--winner');
      yaz.class.add('.btn--roll', 'hide');
      yaz.class.add('.btn--hold', 'hide');
      yaz.class.add('.btn--new', 'animate');
      yaz.class.add('.dice', 'hide');
    } else {
      game.switchPlayer();
    }
  },
};

//Start of game
game.start();

//Roll Button
yaz.click.button('.btn--roll', game.roll);

//Hold Button
yaz.click.button('.btn--hold', game.hold);

//New Game Button
yaz.click.button('.btn--new', game.start);
