var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
];

// DOM elements
var wordToGuessEl = document.getElementById('word-to-guess');
var previousWordEl = document.getElementById('previous-word');
var incorrectLettersEl = document.getElementById('incorrect-letters');
var remainingGuessesEl = document.getElementById('remaining-guesses');
var winsEl = document.getElementById('wins');
var lossesEl = document.getElementById('losses');

// Game variables
var displayedWord = [];
var currentWord = '';
var incorrectLetters = [];
var remainingGuesses = 10;
var previousWord = '';
var wins = 0;
var losses = 0;
var gameOver = false;

// Begin game
function beginGame() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  displayedWord = Array(currentWord.length).fill('_');
  incorrectLetters = [];
  remainingGuesses = 10;
  gameOver = false;

  // Update DOM
  wordToGuessEl.textContent = displayedWord.join('');
  previousWordEl.textContent = previousWord;
  incorrectLettersEl.textContent = '';
  remainingGuessesEl.textContent = remainingGuesses;
}

// User input
document.onkeyup = function(e) {
  const letter = e.key.toLowerCase();

  // Start new word on next key press when game ends
  if (gameOver) {
    previousWord = currentWord;
    beginGame();
    return;
  }

  // Only process single lowercase letters
  if (!/^[a-z]$/.test(letter)) {
    return;
  }

  // Ignore already guessed incorrect letters
  if (incorrectLetters.includes(letter)) {
    return;
  }

  // Ignore already guessed correct letters
  if (displayedWord.includes(letter)) {
    return;
  }

  if (currentWord.includes(letter)) {
    // Reveal correct letters
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === letter) {
        displayedWord[i] = letter;
      }
    }

    // Update word display
    wordToGuessEl.textContent = displayedWord.join('');

    // Check for win
    if (!displayedWord.includes('_')) {
      wins++;
      winsEl.textContent = wins;
      previousWord = currentWord;
      beginGame();
    }
  } else {
    // Incorrect guess
    incorrectLetters.push(letter);
    incorrectLettersEl.textContent = incorrectLetters.join(', ');
    remainingGuesses--;
    remainingGuessesEl.textContent = remainingGuesses;

    // Check for loss
    if (remainingGuesses === 0) {
      losses++;
      lossesEl.textContent = losses;
      gameOver = true;
      wordToGuessEl.textContent = displayedWord.join('');
      remainingGuessesEl.textContent = remainingGuesses;
    }
  }
};

// Start the game at first load
beginGame();