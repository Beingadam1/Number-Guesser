// guess btw min and max
// max guess is 3 and show how many guesses left
// show correct guess if lose
// player should be able to play again

// UI variable
const gameWrapper = document.querySelector('#game-wrapper'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  modal = document.querySelector('#modal'),
  closeModalBtn = document.querySelector('.close-modal'),
  guessInput = document.querySelector('.guess-input'),
  guessBtn = document.querySelector('#guess-btn');

// Game Default value
let min = 1,
  max = 10,
  guessesLeft = 3,
  winningNum = Math.floor(Math.random() * (max - min + 1) + min);

// Assign values to game
minNum.textContent = min;
maxNum.textContent = max;

// play again
gameWrapper.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < min || guess > max) {
    // Wrong Guess
    setMessage(`Wrong! Enter guess between ${min} & ${max}`, '#f24c4c');
    removeAlert();
  } else {
    // Check if guess is correct
    if (guess === winningNum) {
      // Game won
      guessInput.disabled = true;
      guessBtn.value = 'Play Again';
      guessBtn.className = 'play-again';
      setMessage('Correct! You won.', '#5FD068');
      removeAlert();
    } else {
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        // Game over
        guessInput.disabled = true;
        guessBtn.value = 'Play Again';
        guessBtn.className = 'play-again';
        setMessage(
          `Game over! You lost, correct guess is ${winningNum}`,
          '#f24c4c'
        );
        removeAlert();
      } else {
        guessInput.value = '';
        setMessage(`${guess} is wrong, ${guessesLeft} guesses left`, '#f24c4c');
        removeAlert();
      }
    }
  }
});

// Modal function
function setMessage(msg, color) {
  modal.classList.add('active');
  modal.style.backgroundColor = color;
  modal.textContent = msg;
}

// Remove Alert
function removeAlert() {
  setTimeout(function () {
    modal.classList.remove('active');
  }, 3000);
}
